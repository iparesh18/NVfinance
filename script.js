window.onload = () => {
    let percentage = 0;
    const loader = document.getElementById("loader");
    const percentageText = document.getElementById("percentage");
    const progressBar = document.querySelector(".progress-bar");

    // Lock scroll during loading
    document.body.style.overflow = "hidden";

    // Initialize Custom Cursor
    initCustomCursor();

    // Increase percentage from 0 to 100
    const interval = setInterval(() => {
        percentage += Math.floor(Math.random() * 5) + 1; // Randomized increment for more dynamic feel
        if (percentage >= 100) {
            percentage = 100;
            clearInterval(interval);
            
            // Wait a bit before hiding loader
            setTimeout(() => {
                loader.style.opacity = "0";
                loader.style.visibility = "hidden";
                
                // --- Awwwards Hero Sequence ---
                const staggers = document.querySelectorAll('.hero-stagger');
                const btnContainer = document.querySelector('.hero-btns-staggered');
                const imageMask = document.querySelector('.reveal-mask-image');
                
                if (imageMask) {
                    setTimeout(() => {
                        imageMask.classList.add('active');
                    }, 300);
                }

                staggers.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('active');
                    }, 100 + (index * 150)); // Staggered reveal
                });
                
                if (btnContainer) {
                    setTimeout(() => {
                        btnContainer.classList.add('active');
                        // Initialize magnetic buttons after they reveal
                        initMagneticButtons();
                        // Initialize Hero Perspective Tilt
                        initHeroTilt();
                    }, 100 + (staggers.length * 150) + 100);
                }
                
                // Unlock scroll
                document.body.style.overflow = "auto";
                
                // Load dynamic content
                loadReviews();
            }, 800);
        }
        
        percentageText.textContent = `${percentage}%`;
        progressBar.style.width = `${percentage}%`;
    }, 40);
};

// --- Custom Cursor Logic ---
function initCustomCursor() {
    const cursor = document.querySelector(".custom-cursor");
    const follower = document.querySelector(".custom-cursor-follower");
    
    if (!cursor || !follower) return;
    
    // Disable on mobile/tablet or touch devices
    if (window.innerWidth <= 1024 || "ontouchstart" in window || navigator.maxTouchPoints > 0) {
        cursor.style.display = "none";
        follower.style.display = "none";
        return;
    }

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Dot following (fast)
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.transform = `translate3d(${cursorX - 4}px, ${cursorY - 4}px, 0)`;

        // Follower following (slow delay)
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.transform = `translate3d(${followerX - 20}px, ${followerY - 20}px, 0)`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Interaction states
    const interactives = document.querySelectorAll("a, button, .service-card, .dot");
    interactives.forEach(el => {
        el.addEventListener("mouseenter", () => follower.classList.add("active"));
        el.addEventListener("mouseleave", () => follower.classList.remove("active"));
    });
}

// --- Awwwards Magnetic Buttons ---
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll(".btn-magnetic");
    
    // Disable on mobile/tablet or touch devices
    if (window.innerWidth <= 1024 || "ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    magneticBtns.forEach(btn => {
        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Smoother magnetic pull
            btn.style.transform = `translate3d(${x * 0.4}px, ${y * 0.4}px, 0) scale(1.02)`;
        });

        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "translate3d(0, 0, 0) scale(1)";
        });
    });
}

// --- Awwwards Hero Visual Tilt ---
function initHeroTilt() {
    const heroImg = document.querySelector(".hero-perspective");
    const container = document.querySelector(".hero-kinetic-visual");

    if (!heroImg || !container) return;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    container.addEventListener("mousemove", (e) => {
        const { width, height, left, top } = container.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / (width / 2);
        const y = (e.clientY - top - height / 2) / (height / 2);

        // Subtle 3D tilt
        heroImg.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(20px)`;
    });

    container.addEventListener("mouseleave", () => {
        heroImg.style.transform = `rotateY(0deg) rotateX(0deg) translateZ(0px)`;
    });
}

// --- Hamburger Menu ---
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("active");
});

// Close menu when clicking links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove("open");
        hamburger.classList.remove("active");
    });
});

// --- Scroll Effects ---
const header = document.getElementById("mainHeader");
const backToTop = document.getElementById("backToTop");
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    
    // Scrolled state for background
    if (currentScrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    // Hide/Reveal logic
    if (currentScrollY > lastScrollY && currentScrollY > 150) {
        // Scrolling down - hide
        header.classList.add("nav-hidden");
    } else {
        // Scrolling up - reveal
        header.classList.remove("nav-hidden");
    }
    
    lastScrollY = currentScrollY;
});

// --- Back to Top ---
if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// --- Intersection Observer for Reveal Animations ---
const revealElements = document.querySelectorAll(".reveal, .reveal-mask-image, .footer-cta-section, .reveal-mask");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            
            // Special handling for footer-cta section if needed
            if (entry.target.classList.contains("footer-cta-section")) {
                entry.target.classList.add("revealed");
            }

            // If it's a counter, animate it
            if (entry.target.classList.contains("counter")) {
                animateCounter(entry.target);
            }
        }
    });
}, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => revealObserver.observe(el));

// --- Counter Animation ---
function animateCounter(counter) {
    if (counter.classList.contains('animated')) return;
    counter.classList.add('animated');
    
    const target = +counter.getAttribute("data-target");
    const speed = +counter.getAttribute("data-speed") || 20;
    let count = 0;
    
    const increment = target / (1000 / speed);
    
    const updateCount = () => {
        count += increment;
        if (count < target) {
            counter.innerText = Math.ceil(count);
            setTimeout(updateCount, speed);
        } else {
            counter.innerText = target;
        }
    };
    
    updateCount();
}

// Observe counters specifically if they are not inside a .reveal element (though they are in our HTML)
document.querySelectorAll(".counter").forEach(counter => revealObserver.observe(counter));

// --- Client Reviews ---
const reviews = [
    {
        name: "Kirankumar Gadagi",
        review: "Awesome experience and good experience every type of loans and mostly service of documents safety.. Good work 🙏🙏🙏",
        rating: 5,
        time: "10 Aug 2025, 2:30 PM",
    },
    {
        name: "Neelam Gulabani",
        review: "Good person and work is also good. I applied and immediately loan processed. All services are so good.... please visit for any loan requirements.",
        rating: 4,
        time: "9 July 2025, 5:15 PM",
    },
    {
        name: "Kesharsingh Rathore",
        review: "Excellent work and full support from Mr. Vijay Bhai. Highly recommended for loan assistance.",
        rating: 5,
        time: "5 Aug 2025, 11:45 AM",
    },
    {
        name: "Vijay Singh",
        review: "Good work and better behavior from NV Finance Solution. Very helpful staff.",
        rating: 4,
        time: "7 Sept 2025, 6:00 PM",
    },
];

const container = document.getElementById("reviews-container");
const dotsContainer = document.getElementById("sliderDots");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentSlide = 0;
let slideInterval;

function loadReviews() {
    if (!container) return;
    container.innerHTML = "";
    reviews.forEach((review) => {
        const card = document.createElement("div");
        card.className = "review-card reveal";
        card.innerHTML = `
            <div class="rating">${"⭐".repeat(review.rating)}</div>
            <p class="review-text">"${review.review}"</p>
            <div class="review-author">
                <h4>${review.name}</h4>
                <span class="review-date">${review.time}</span>
            </div>
        `;
        container.appendChild(card);
        revealObserver.observe(card);
    });

    // Initialize Slider after cards are loaded
    initSlider();
}

function initSlider() {
    const cards = container.querySelectorAll(".review-card");
    const totalSlides = Math.ceil(cards.length / getVisibleSlides());
    
    // Clear dots
    dotsContainer.innerHTML = "";
    
    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("div");
        dot.className = `dot ${i === 0 ? "active" : ""}`;
        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    // Nav buttons
    prevBtn.addEventListener("click", () => {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
    });

    nextBtn.addEventListener("click", () => {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
    });

    // Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    container.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    container.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            nextSlide();
        } else if (touchEndX - touchStartX > 50) {
            prevSlide();
        }
    }

    // Auto-play
    startAutoPlay();
    container.addEventListener("mouseenter", stopAutoPlay);
    container.addEventListener("mouseleave", startAutoPlay);
}

function getVisibleSlides() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
}

function goToSlide(index) {
    const cards = container.querySelectorAll(".review-card");
    const totalSlides = Math.ceil(cards.length / getVisibleSlides());
    
    if (index >= totalSlides) index = 0;
    if (index < 0) index = totalSlides - 1;
    
    currentSlide = index;
    const offset = currentSlide * (100 / totalSlides) * (totalSlides); // Simplified translation
    
    // Calculate gap and width correctly
    const cardWidth = cards[0].offsetWidth + 30; // 30 is the gap
    container.style.transform = `translateX(-${currentSlide * getVisibleSlides() * cardWidth}px)`;
    
    // Update dots
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentSlide);
    });
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    goToSlide(currentSlide - 1);
}

function startAutoPlay() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopAutoPlay() {
    clearInterval(slideInterval);
}

// Re-init on resize
window.addEventListener("resize", () => {
    goToSlide(0); // Reset to start on resize for simplicity
});
