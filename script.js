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
// Initialize Supabase


import { getReviews, submitReview } from './review.js';

const container = document.getElementById("reviews-container");
const form = document.getElementById("review-form");

async function loadReviews() {
  container.innerHTML = "";
  try {
    const data = await getReviews();
    data.forEach((review) => {
      const card = document.createElement("div");
      card.className = "review-card";

      const reviewDate = new Date(review.created_at);
      const formattedDate = reviewDate.toLocaleDateString('en-GB', {
        day: '2-digit', month: 'long', year: 'numeric'
      });
      const formattedTime = reviewDate.toLocaleTimeString('en-GB', {
        hour: '2-digit', minute: '2-digit', hour12: true
      });

      card.innerHTML = `
        <h4>${review.name}</h4>
        <div class="rating">${"⭐".repeat(review.rating)}</div>
        <p>${review.review}</p>
        <span class="review-date">${formattedDate}, ${formattedTime}</span>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading reviews:", error);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const review = document.getElementById("review").value.trim();
  const rating = parseInt(document.getElementById("rating").value);

  if (!name || !review || !rating) {
    alert("All fields are required!");
    return;
  }

  try {
    await submitReview(name, review, rating);
    form.reset();
    loadReviews();
  } catch (error) {
    console.error("Submit error:", error);
    alert("Failed to submit review.");
  }
});

window.onload = loadReviews;

window.onload = () => {
  let percentage = 0;
  const loader = document.getElementById('loader');
  const percentageText = document.getElementById('percentage');
  
  // Show loader
  loader.style.display = 'flex';

  // Increase percentage from 0 to 100
  const interval = setInterval(() => {
    percentage += 1;
    percentageText.textContent = `${percentage}%`;

    if (percentage >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
        }, 1000); // Delay the removal after fade
      }, 500); // After reaching 100%, wait before fading out
    }
  }, 30); // Controls the speed of the loader
};


