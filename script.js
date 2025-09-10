// ------------------
// Hamburger Menu
// ------------------
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

// ------------------
// Scroll effect for navbar
// ------------------
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ------------------
// Counter Animation
// ------------------
const counters = document.querySelectorAll(".counter");

const animateCounters = () => {
  counters.forEach((counter) => {
    counter.innerText = "0";
    const target = +counter.getAttribute("data-target");
    const speed = +counter.getAttribute("data-speed") || 20;

    const updateCount = () => {
      const count = +counter.innerText;
      const increment = Math.ceil(target / 100);

      if (count < target) {
        counter.innerText =
          count + increment > target ? target : count + increment;
        setTimeout(updateCount, speed);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
      }
    });
  },
  {
    threshold: 0.5,
  }
);

const aboutSection = document.querySelector(".about-section");
observer.observe(aboutSection);

// ------------------
// Client Reviews (static)
// ------------------
const reviews = [
  {
    name: "Kirankumar Gadagi",
    review: "Awesome experience and good experience ervey type of loans and mostly service of documents sefty.. Good work 🙏🙏🙏",
    rating: 4,
    time: "10 Aug 2025, 2:30 PM",
  },
  {
    name: "Neelam Gulabani",
    review: "Good person and work is also good i am loan apply and immediately loan process. All service are so good....pls visit any loan required pls contact him",
    rating: 4,
    time: "9 July 2025, 5:15 PM",
  },
  {
    name: "Kesharsingh Rathore",
    review: "good work and full support mr vijay bhai",
    rating: 5,
    time: "5 Aug 2025, 11:45 AM",
  },
  {
    name: "Vijay Singh",
    review: "Good work and better behaviour nv finance salutuon",
    rating: 3,
    time: "7 Sept 2025, 6:00 PM",
  },
];

const container = document.getElementById("reviews-container");

function loadReviews() {
  container.innerHTML = "";
  reviews.forEach((review) => {
    const card = document.createElement("div");
    card.className = "review-card";
    card.innerHTML = `
      <h4>${review.name}</h4>
      <div class="rating">${"⭐".repeat(review.rating)}</div>
      <p>${review.review}</p>
      <span class="review-date">${review.time}</span>
    `;
    container.appendChild(card);
  });
}

// ------------------
// Loader + Init
// ------------------
window.onload = () => {
  let percentage = 0;
  const loader = document.getElementById("loader");
  const percentageText = document.getElementById("percentage");

  // Show loader
  loader.style.display = "flex";

  // Increase percentage from 0 to 100
  const interval = setInterval(() => {
    percentage += 1;
    percentageText.textContent = `${percentage}%`;

    if (percentage >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
          loader.style.display = "none";
          // ✅ Load reviews AFTER loader finishes
          loadReviews();
        }, 1000);
      }, 500);
    }
  }, 30); // Controls the speed of the loader
};
