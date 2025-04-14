export default async function handler(req, res) {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY; // Use anon key instead of secret key

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return res.status(500).json({ error: "Supabase credentials not set." });
  }

  if (req.method === "GET") {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/finance_reviews?select=*`, {
        headers: {
          apikey: SUPABASE_ANON_KEY, // Use anon key here
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      });

      // Check if the response was okay
      if (!response.ok) {
        return res.status(500).json({ error: "Failed to fetch reviews." });
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return res.status(500).json({ error: "Failed to fetch reviews." });
    }
  }

  if (req.method === "POST") {
    const { name, review, rating } = req.body;

    // Check if any required fields are missing
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

      if (!response.ok) {
        const errorData = await response.json();
        return res.status(500).json({ error: "Failed to submit review", details: errorData });
      }

      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error("Error submitting review:", error);
      return res.status(500).json({ error: "Failed to submit review." });
    }
  }

  // Handle unsupported request methods
  return res.status(405).json({ error: "Method not allowed" });
}
