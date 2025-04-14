// /api/review.js
export default async function handler(req, res) {
    const { SUPABASE_URL, SUPABASE_SECRET_KEY } = process.env;
  
    if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
      return res.status(500).json({ error: "Supabase credentials not set" });
    }
  
    if (req.method === "GET") {
      // Fetch all reviews
      const response = await fetch(`${SUPABASE_URL}/rest/v1/finance_reviews?select=*&order=created_at.desc`, {
        headers: {
          apikey: SUPABASE_SECRET_KEY,
          Authorization: `Bearer ${SUPABASE_SECRET_KEY}`,
        },
      });
  
      const data = await response.json();
      return res.status(200).json(data);
    }
  
    if (req.method === "POST") {
      // Add new review
      const { name, review, rating } = req.body;
  
      if (!name || !review || !rating) {
        return res.status(400).json({ error: "Missing fields" });
      }
  
      const response = await fetch(`${SUPABASE_URL}/rest/v1/finance_reviews`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_SECRET_KEY,
          Authorization: `Bearer ${SUPABASE_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([{ name, review, rating }]),
      });
  
      const data = await response.json();
      return res.status(200).json(data);
    }
  
    // For other methods
    return res.status(405).json({ error: "Method not allowed" });
  }
  