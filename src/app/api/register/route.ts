import { supabase } from "@/lib/supabaseClient"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  const { data, error } = await supabase
    .from("applications")
    .insert([body])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, data })
}
