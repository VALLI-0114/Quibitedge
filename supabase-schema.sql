-- QubitEdge Summer Internship 2K26 - Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Applications table (main record with personal details)
CREATE TABLE applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  app_id TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  father_name TEXT,
  mother_name TEXT,
  date_of_birth DATE,
  gender TEXT,
  phone TEXT NOT NULL,
  alternate_phone TEXT,
  email TEXT NOT NULL,
  address TEXT,
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'India',
  pincode TEXT,
  linkedin TEXT,
  github TEXT,
  portfolio_website TEXT,
  profile_photo_url TEXT,
  aadhaar_number TEXT,
  aadhaar_front_url TEXT,
  aadhaar_back_url TEXT,
  nationality TEXT DEFAULT 'Indian',
  emergency_contact_name TEXT,
  emergency_contact_number TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected')),
  current_step INTEGER DEFAULT 1,
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Academic Details table
CREATE TABLE academic_details (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  college_name TEXT,
  university_name TEXT,
  degree TEXT,
  branch TEXT,
  current_semester TEXT,
  roll_number TEXT,
  registration_number TEXT,
  year_of_study TEXT,
  previous_semester_cgpa TEXT,
  overall_cgpa TEXT,
  tenth_percentage TEXT,
  twelfth_percentage TEXT,
  skills TEXT[] DEFAULT '{}',
  programming_languages TEXT[] DEFAULT '{}',
  certifications TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Internship Preferences table
CREATE TABLE internship_preferences (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  domain TEXT,
  internship_mode TEXT CHECK (internship_mode IN ('Online', 'Hybrid')),
  preferred_duration TEXT,
  why_internship TEXT,
  areas_of_interest TEXT,
  career_goals TEXT,
  available_start_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  num_projects INTEGER DEFAULT 0,
  project_titles TEXT[] DEFAULT '{}',
  project_descriptions TEXT[] DEFAULT '{}',
  technologies_used TEXT[] DEFAULT '{}',
  github_links TEXT[] DEFAULT '{}',
  live_links TEXT[] DEFAULT '{}',
  resume_url TEXT,
  portfolio_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  fee_amount DECIMAL(10, 2) DEFAULT 0,
  payment_date DATE,
  transaction_id TEXT,
  upi_id TEXT,
  payment_method TEXT CHECK (payment_method IN ('UPI', 'Bank Transfer', 'QR Payment')),
  payment_screenshot_url TEXT,
  transaction_receipt_url TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'verified', 'rejected')),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Documents table (consolidated file references)
CREATE TABLE documents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_name TEXT,
  file_size INTEGER,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_applications_email ON applications(email);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_app_id ON applications(app_id);
CREATE INDEX idx_academic_app_id ON academic_details(application_id);
CREATE INDEX idx_preferences_app_id ON internship_preferences(application_id);
CREATE INDEX idx_projects_app_id ON projects(application_id);
CREATE INDEX idx_payments_app_id ON payments(application_id);
CREATE INDEX idx_payments_transaction_id ON payments(transaction_id);
CREATE INDEX idx_documents_app_id ON documents(application_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_academic_updated_at BEFORE UPDATE ON academic_details FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_preferences_updated_at BEFORE UPDATE ON internship_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Storage buckets (create these via Supabase Dashboard > Storage)
-- Buckets: resumes, photos, aadhaar-docs, payment-proofs, portfolios
