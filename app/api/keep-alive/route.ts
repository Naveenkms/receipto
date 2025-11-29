import { createClient } from "@/lib/supabase/server";
import { NextResponse } from 'next/server';

// a simple keep-alive endpoint to avoid the supabase project from being paused for free tier
export async function GET() {

  const supabase = await createClient();

  // Run a simple query to wake up the DB
  const { data, error } = await supabase.from('users').select('count', { count: 'exact', head: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ message: 'Supabase pinged successfully' });
}