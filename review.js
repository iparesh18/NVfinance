// review.js
const SUPABASE_URL = "https://fydlohqmrbopoiaesqig.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5ZGxvaHFtcmJvcG9pYWVzcWlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MDgwMTgsImV4cCI6MjA2MDE4NDAxOH0.SZCTMH6EFxR6Gz4i8mCTayFaDsGt_Q6CJYlI1SP5WKk";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function getReviews() {
  const { data, error } = await client
    .from("finance_reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function submitReview(name, review, rating) {
  const { error } = await client.from("finance_reviews").insert([
    { name, review, rating }
  ]);

  if (error) throw error;
}
