// Hamburger
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const overlay = document.getElementById("overlay");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  overlay.classList.toggle("show");
  hamburger.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  navLinks.classList.remove("open");
  overlay.classList.remove("show");
  hamburger.classList.remove("active");
});
// Scroll effect 

  window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

// Animation 

const counters = document.querySelectorAll('.counter');

  const animateCounters = () => {
    counters.forEach(counter => {
      counter.innerText = '0';
      const target = +counter.getAttribute('data-target');
      const speed = +counter.getAttribute('data-speed') || 20;

      const updateCount = () => {
        const count = +counter.innerText;
        const increment = Math.ceil(target / 100);

        if (count < target) {
          counter.innerText = count + increment > target ? target : count + increment;
          setTimeout(updateCount, speed);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
    });
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
      }
    });
  }, {
    threshold: 0.5
  });

  const aboutSection = document.querySelector('.about-section');
  observer.observe(aboutSection);

  // Review
  // ✅ Create the Supabase client safely
const client = supabase.createClient(
  "https://fydlohqmrbopoiaesqig.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5ZGxvaHFtcmJvcG9pYWVzcWlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MDgwMTgsImV4cCI6MjA2MDE4NDAxOH0.SZCTMH6EFxR6Gz4i8mCTayFaDsGt_Q6CJYlI1SP5WKk"
);

const container = document.getElementById("reviews-container");
const form = document.getElementById("review-form");

// Load existing reviews
async function loadReviews() {
  container.innerHTML = ""; // Clear existing reviews

  const { data, error } = await client
    .from("finance_reviews")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading reviews:", error);
    return;
  }

  data.forEach((review) => {
    const card = document.createElement("div");
    card.className = "review-card";

    // Format the timestamp as "14 April 2025, 10:30 AM"
    const reviewDate = new Date(review.created_at);
    const formattedDate = reviewDate.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric' 
    });

    // Format the time as "10:30 AM"
    const formattedTime = reviewDate.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    });

    card.innerHTML = `
      <h4>${review.name}</h4>
      <div class="rating">${"⭐".repeat(review.rating)}</div>
      <p>${review.review}</p>
      <span class="review-date">${formattedDate}, ${formattedTime}</span> <!-- Add date and time here -->
    `;

    container.appendChild(card);
  });
}



// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const review = document.getElementById("review").value.trim();
  const rating = parseInt(document.getElementById("rating").value);

  if (!name || !review || !rating) {
    alert("All fields are required!");
    return;
  }

  const { error } = await client.from("finance_reviews").insert([
    {
      name,
      review,
      rating,
    },
  ]);

  if (error) {
    console.error("Failed to submit:", error);
    alert("Something went wrong. Try again.");
    return;
  }

  form.reset();
  loadReviews(); // Refresh list
});

// Load reviews on page load
window.onload = loadReviews;
