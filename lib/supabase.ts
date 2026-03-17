import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://xkaoyynjymbmkiqzcyhb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrYW95eW5qeW1ibWtpcXpjeWhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3MTEyOTcsImV4cCI6MjA4OTI4NzI5N30.-bG7D186hmfaWxr07j866ngYFY-OgsZNTir0jVR4060";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
