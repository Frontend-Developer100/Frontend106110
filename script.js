// 1. Mega-Menu Data (Matching Apple.com navigation categories)
const menuData = {
    store: {
        primary: ["Shop the Latest", "Mac", "iPad", "iPhone", "Apple Watch", "Apple Vision Pro", "AirPods", "Accessories"],
        secondary: ["Find a Store", "Order Status", "Apple Upgrade", "Apple Trade In", "Financing", "Personal Setup"]
    },
    mac: {
        primary: ["Explore All Mac", "MacBook Neo", "MacBook Air", "MacBook Pro", "iMac", "Mac mini", "Mac Studio", "Displays"],
        secondary: ["Shop Mac", "Help Me Choose", "Mac Accessories", "Apple Upgrade", "Apple Trade In"]
    },
    ipad: {
        primary: ["Explore All iPad", "iPad Pro", "iPad Air", "iPad", "iPad mini", "Apple Pencil", "Keyboards"],
        secondary: ["Shop iPad", "iPad Accessories", "Apple Upgrade", "Apple Trade In"]
    },
    iphone: {
        primary: ["Explore All iPhone", "iPhone Duo", "iPhone 18 Pro", "iPhone Air", "iPhone 17", "iPhone 17e", "iPhone 16"],
        secondary: ["Shop iPhone", "iPhone Accessories", "Apple Upgrade", "Apple Trade In", "Carrier Deals at Apple"]
    },
    watch: {
        primary: ["Explore All Apple Watch", "Apple Watch Series 12", "Apple Watch Ultra 4", "Apple Watch SE 3", "Apple Watch Nike"],
        secondary: ["Shop Apple Watch", "Apple Watch Bands", "Apple Watch Accessories", "Apple Trade In"]
    },
    vision: {
        primary: ["Explore Apple Vision Pro", "Tech Specs"],
        secondary: ["Shop Apple Vision Pro", "Apple Vision Pro Accessories", "Book a Demo"]
    },
    airpods: {
        primary: ["Explore All AirPods", "AirPods 5", "AirPods Pro 3", "AirPods Max 2"],
        secondary: ["Shop AirPods", "AirPods Accessories", "AppleCare"]
    },
    home: {
        primary: ["Explore Home", "Apple HomeView", "Apple TV 4K", "HomePod", "HomePod mini 2"],
        secondary: ["Shop Home", "Shop Apple Home Collection", "Home Accessories"]
    },
    entertainment: {
        primary: ["Explore Entertainment", "Apple One", "Apple TV", "Apple Music", "Apple Arcade", "Apple Fitness+", "Apple News+"],
        secondary: ["Apple TV Support", "Apple Music Support"]
    },
    accessories: {
        primary: ["Shop All Accessories", "iPhone", "iPad", "Mac", "Apple Watch", "Apple Vision Pro", "AirPods", "Home"],
        secondary: ["New Arrivals", "Made by Apple", "Accessibility"]
    },
    support: {
        primary: ["iPhone", "Mac", "iPad", "Watch", "Apple Vision Pro", "AirPods", "Music", "TV"],
        secondary: ["Community", "Check Coverage", "Genius Bar", "Repair", "Get AppleCare"]
    }
};

const globalNav = document.getElementById("globalNav");
const navFlyout = document.getElementById("navFlyout");
const flyoutContent = document.getElementById("flyoutContent");
const pageOverlay = document.getElementById("pageOverlay");
const navItems = document.querySelectorAll(".nav-links li");

navItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
        const key = item.dataset.menu;
        const data = menuData[key];
        if (!data) return;

        flyoutContent.innerHTML = `
      <div class="flyout-col primary">
        <h5>Explore ${item.textContent}</h5>
        <ul>${data.primary.map((link) => `<li><a href="#">${link}</a></li>`).join("")}</ul>
      </div>
      <div class="flyout-col secondary">
        <h5>Quick Links</h5>
        <ul>${data.secondary.map((link) => `<li><a href="#">${link}</a></li>`).join("")}</ul>
      </div>
    `;

        globalNav.classList.add("open");
        navFlyout.classList.add("active");
        pageOverlay.classList.add("active");
    });
});

globalNav.addEventListener("mouseleave", () => {
    globalNav.classList.remove("open");
    navFlyout.classList.remove("active");
    pageOverlay.classList.remove("active");
});

// 2. Endless Entertainment Carousel
const slidesData = [
    {
        genre: "Crime",
        desc: "12 months to plan. 12 hours to execute. 12 days to escape.",
        bg: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
    },
    {
        genre: "Drama",
        desc: "Scrappy and defiant, Judy Heumann turns her outrage into a revolution.",
        bg: "linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b)"
    },
    {
        genre: "F1 on Apple TV",
        desc: "Every Grand Prix™, live and on demand—all in one place, all year long.",
        bg: "linear-gradient(135deg, #8e0e00, #1f1c18)"
    },
    {
        genre: "Comedy",
        desc: "New season. Laughs without limits.",
        bg: "linear-gradient(135deg, #134e5e, #71b280)"
    },
    {
        genre: "MLS on Apple TV",
        desc: "Watch every club, every match, live—all season long.",
        bg: "linear-gradient(135deg, #000428, #004e92)"
    },
    {
        genre: "Thriller",
        desc: "MI5’s most unruly spies are back and under attack.",
        bg: "linear-gradient(135deg, #232526, #414345)"
    },
    {
        genre: "Comedy",
        desc: "The hit comedy is back and Tedder than ever.",
        bg: "linear-gradient(135deg, #1d4350, #a43931)"
    }
];

const track = document.getElementById("carouselTrack");
const dotsContainer = document.getElementById("carouselDots");
const playPauseBtn = document.getElementById("playPauseBtn");

let currentIndex = 0;
let isPlaying = true;
let autoplayTimer;

slidesData.forEach((slide, idx) => {
    const slideEl = document.createElement("div");
    slideEl.className = `carousel-slide ${idx === 0 ? "active" : ""}`;
    slideEl.style.background = slide.bg;
    slideEl.innerHTML = `
    <div class="slide-meta">
      <a href="#" class="slide-btn">Stream now</a>
      <p class="slide-desc"><strong>${slide.genre}</strong>${slide.desc}</p>
    </div>
  `;
    track.appendChild(slideEl);

    const dot = document.createElement("button");
    dot.className = `dot ${idx === 0 ? "active" : ""}`;
    dot.setAttribute("aria-label", `Item ${idx + 1}`);
    dot.addEventListener("click", () => goToSlide(idx));
    dotsContainer.appendChild(dot);
});

function goToSlide(index) {
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".dot");

    currentIndex = (index + slides.length) % slides.length;
    const slideWidth = slides[0].offsetWidth + 16;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    slides.forEach((s, i) => s.classList.toggle("active", i === currentIndex));
    dots.forEach((d, i) => d.classList.toggle("active", i === currentIndex));
}

function startAutoplay() {
    autoplayTimer = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 4000);
}

playPauseBtn.addEventListener("click", () => {
    if (isPlaying) {
        clearInterval(autoplayTimer);
        playPauseBtn.textContent = "▶";
    } else {
        startAutoplay();
        playPauseBtn.textContent = "❚❚";
    }
    isPlaying = !isPlaying;
});

startAutoplay();

// 3. Mobile Footer Accordion
document.querySelectorAll(".footer-col h4").forEach((heading) => {
    heading.addEventListener("click", () => {
        const list = heading.nextElementSibling;
        if (list) list.classList.toggle("open");
    });
});