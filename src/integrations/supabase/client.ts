// src/integrations/supabase/client.ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// TEMPORARY DEBUGGING: Hardcode keys to test deployment
// REPLACE THESE STRINGS WITH YOUR ACTUAL KEYS
const SUPABASE_URL = "https://izaixznfdhdmavtwdhnr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6YWl4em5mZGhkbWF2dHdkaG5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5Mzc0MTEsImV4cCI6MjA3ODUxMzQxMX0.HnWBX3B7ocglUgZ91Say1TPkWQ6f5NbDF4pYL3CirRs";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
