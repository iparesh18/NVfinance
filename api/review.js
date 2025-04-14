export default async function handler(req, res) {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return res.status(500).json({ error: "Supabase credentials not set." });
  }

  if (req.method === "GET") {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/finance_reviews?select=*`, {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      });

      const data = await response.json();
      
      // Handle case where data might not be an array
      if (!Array.isArray(data)) {
        return res.status(500).json({ error: "Invalid response from Supabase." });
      }

      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ error: "Failed to fetch reviews." });
    }
  }

  if (req.method === "POST") {
    const { name, review, rating } = req.body;

    if (!name || !review || !rating) {
      return res.status(400).json({ error: "Missing fields" });
    }

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/finance_reviews`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([{ name, review, rating }]),
      });

      const data = await response.json();

      if (!response.ok) {
        return res.status(500).json({ error: "Failed to submit review.", details: data });
      }

      res.status(200).json(data);
    } catch (error) {
      console.error("Error submitting review:", error);
      res.status(500).json({ error: "Failed to submit review." });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
