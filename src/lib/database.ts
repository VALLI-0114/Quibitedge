import { supabase } from "./supabaseClient"

// ========== CREATE APPLICATION (Step 1 - Personal Details) ==========

export async function createApplication(personalData: any) {
  // Generate a unique app_id format: QE-XXXXXX
  const appId = `QE2K26-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const { data, error } = await supabase
    .from("applications")
    .insert([
      {
        app_id: appId,
        full_name: personalData.full_name,
        email: personalData.email,
        phone: personalData.phone,
        gender: personalData.gender,
        date_of_birth: personalData.date_of_birth,
        status: "pending" // Changed from draft to pending to match database CHECK constraint
      }
    ])
    .select()
    .single()

  if (error) throw error

  return data
}

// ========== UPDATE APPLICATION ==========

export async function updateApplication(id: string, data: any) {
  const { error } = await supabase
    .from("applications")
    .update(data)
    .eq("id", id)

  if (error) throw error
}

// ========== SAVE ACADEMIC DETAILS (Step 2) ==========

export async function saveAcademicDetails(appId: string, data: any) {
  const { error } = await supabase
    .from("academic_details")
    .upsert({
      application_id: appId,
      college_name: data.college_name,
      degree: data.degree,
      branch: data.branch,
      current_semester: data.semester,
      overall_cgpa: data.cgpa
    })

  if (error) throw error
}

// ========== SAVE PREFERENCES (Step 3) ==========

export async function savePreferences(appId: string, data: any) {
  const { error } = await supabase
    .from("internship_preferences")
    .upsert({
      application_id: appId,
      domain: data.domain,
      internship_mode: data.internship_mode,
      preferred_duration: data.preferred_duration,
      why_internship: data.why_internship
    })

  if (error) throw error
}

// ========== SAVE PROJECTS (Step 4) ==========

export async function saveProjects(appId: string, data: any) {
  const { error } = await supabase
    .from("projects")
    .upsert({
      application_id: appId,
      project_titles: [data.project_title || ''], // Schema uses project_titles TEXT[]
      project_descriptions: [data.project_description || ''], // Schema uses project_descriptions TEXT[]
      technologies_used: data.technologies ? [data.technologies] : [],
      resume_url: data.resume_url
    })

  if (error) throw error
}

// ========== SAVE PAYMENT (Step 5) ==========

export async function savePayment(appId: string, data: any) {
  const { error } = await supabase
    .from("payments")
    .upsert({
      application_id: appId,
      transaction_id: data.transaction_id,
      payment_method: data.payment_method,
      payment_date: data.payment_date,
      fee_amount: data.fee_amount, // DB schema uses fee_amount
      payment_screenshot_url: data.payment_screenshot_url
    })

  if (error) throw error
}

// ========== FILE UPLOAD ==========

export async function uploadFile(bucket: string, path: string, file: File) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true })

  if (error) throw error

  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)

  return urlData.publicUrl
}

// ========== SUBMIT APPLICATION ==========

export async function submitApplication(appId: string) {
  const { data, error } = await supabase
    .from("applications")
    .update({
      status: "pending", // Status in database schema does not allow 'submitted'
      submitted_at: new Date()
    })
    .eq("id", appId)
    .select()
    .single()

  if (error) throw error

  return { app_id: data.app_id }
}

// ========== CHECK APPLICATION (Status Page) ==========

export async function checkApplication(email: string) {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("email", email)
    .single()

  if (error && error.code !== "PGRST116") throw error

  return data
}

// ========== GET APPLICATION BY APP ID ==========

export async function getApplicationByAppId(appId: string) {
  const { data, error } = await supabase
    .from("applications")
    .select(`
      *,
      academic_details(*),
      internship_preferences(*),
      projects(*),
      payments(*)
    `)
    .eq("app_id", appId)
    .single()

  if (error) throw error
  return data
}

// ========== GET APPLICATION BY EMAIL ==========

export async function getApplicationByEmail(email: string) {
  const { data, error } = await supabase
    .from("applications")
    .select(`
      *,
      academic_details(*),
      internship_preferences(*),
      projects(*),
      payments(*)
    `)
    .eq("email", email)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

// ========== ADMIN: GET ALL APPLICATIONS ==========

export async function getAllApplications(filters?: {
  status?: string
  domain?: string
  search?: string
}) {
  let query = supabase
    .from("applications")
    .select(`
      *,
      academic_details(*),
      internship_preferences(*),
      projects(*),
      payments(*)
    `)
    .order("created_at", { ascending: false })

  if (filters?.status && filters.status !== "all") {
    query = query.eq("status", filters.status)
  }
  if (filters?.search) {
    query = query.or(
      `full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,app_id.ilike.%${filters.search}%`
    )
  }

  const { data, error } = await query
  if (error) throw error

  if (filters?.domain && filters.domain !== "all" && data) {
    return data.filter((app: any) => {
      const prefs = app.internship_preferences
      return prefs && prefs.length > 0 && prefs[0]?.domain === filters.domain
    })
  }

  return data
}

// ========== ADMIN: UPDATE APPLICATION STATUS ==========

export async function updateApplicationStatus(id: string, status: string) {
  console.log(`Database: Updating application ${id} status to ${status}`);
  const { data, error } = await supabase
    .from("applications")
    .update({ status })
    .eq("id", id)
    .select()

  if (error) {
    console.error(`Database Error: Failed to update application ${id}:`, error);
    throw error;
  }
  console.log(`Database: Successfully updated application ${id}`);
  return data?.[0] || null;
}

// ========== ADMIN: VERIFY PAYMENT ==========

export async function verifyPayment(applicationId: string, status: string) {
  console.log(`Database: Verifying payment for application ${applicationId} as ${status}`);
  const { data, error } = await supabase
    .from("payments")
    .update({
      payment_status: status,
      verified_at: status === "verified" ? new Date().toISOString() : null
    })
    .eq("application_id", applicationId)
    .select()

  if (error) {
    console.error(`Database Error: Failed to verify payment for ${applicationId}:`, error);
    throw error;
  }
  
  if (!data || data.length === 0) {
    console.warn(`Database Warning: No payment records found for application ${applicationId}`);
  } else {
    console.log(`Database: Successfully updated ${data.length} payment record(s) for ${applicationId}`);
  }
  
  return data?.[0] || null;
}

// ========== ADMIN: GET APPLICATION STATS ==========

export async function getApplicationStats() {
  const { data: all } = await supabase.from("applications").select("status, created_at")
  const { data: prefs } = await supabase.from("internship_preferences").select("domain")
  const { data: payments } = await supabase.from("payments").select("payment_status")

  const stats = {
    total: all?.length || 0,
    pending: all?.filter((a: any) => a.status === "pending").length || 0,
    underReview: all?.filter((a: any) => a.status === "under_review").length || 0,
    approved: all?.filter((a: any) => a.status === "approved").length || 0,
    rejected: all?.filter((a: any) => a.status === "rejected").length || 0,
    domainDistribution: {} as Record<string, number>,
    paymentStats: {
      pending: payments?.filter((p: any) => p.payment_status === "pending").length || 0,
      verified: payments?.filter((p: any) => p.payment_status === "verified").length || 0,
      rejected: payments?.filter((p: any) => p.payment_status === "rejected").length || 0,
    },
  }

  prefs?.forEach((p: any) => {
    if (p.domain) {
      stats.domainDistribution[p.domain] = (stats.domainDistribution[p.domain] || 0) + 1
    }
  })

  return stats
}

// ========== ADMIN: DELETE APPLICATION ==========

export async function deleteApplication(id: string) {
  console.log('Attempting to delete application with ID:', id);
  const { error } = await supabase
    .from("applications")
    .delete()
    .eq("id", id)

  if (error) {
    console.error('Delete error for ID:', id, error);
    throw error;
  }
  console.log('Successfully deleted application with ID:', id);
}
