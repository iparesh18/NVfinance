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

  const container = document.getElementById("reviews-container");
const form = document.getElementById("review-form");

// Load existing reviews
async function loadReviews() {
  container.innerHTML = ""; // Clear existing reviews

  const res = await fetch("/api/review"); // Adjust URL if needed
  const data = await res.json();

  console.log(data); // Log the response to verify the structure

  // Ensure that data is an array
  if (Array.isArray(data)) {
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

      const formattedTime = reviewDate.toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
      });

      card.innerHTML = `
        <h4>${review.name}</h4>
        <div class="rating">${"⭐".repeat(review.rating)}</div>
        <p>${review.review}</p>
        <span class="review-date">${formattedDate}, ${formattedTime}</span>
      `;

      container.appendChild(card);
    });
  } else {
    console.error("Expected array, but got:", data);
  }
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

  const res = await fetch("/api/review", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, review, rating }),
  });

  if (!res.ok) {
    alert("Something went wrong. Try again.");
    return;
  }

  form.reset();
  loadReviews(); // Refresh list of reviews
});

// Load reviews on page load
window.onload = loadReviews;
