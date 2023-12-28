const { createClient } = require("@supabase/supabase-js");

// Replace with your actual Supabase project URL and key
const supabaseUrl = "https://nkaxnoxocaglizzrfhjw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rYXhub3hvY2FnbGl6enJmaGp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxMjAyNjQsImV4cCI6MjAxNTY5NjI2NH0.BtdGBAYeLPKDiFYNAwQILcUuC2H6VC-xzGQcytPhJuA";

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;