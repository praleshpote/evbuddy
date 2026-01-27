// 1. Carousel Images
const carouselImages = [
  "https://evbuddy.net/assets/cf_1-DECYg6IV.jpg",
  "https://evbuddy.net/assets/cf_2-C_FoQxDN.jpg",
  "https://evbuddy.net/assets/cf_3-BsKqwhVn.jpg",
  "https://evbuddy.net/assets/cf_4-CgKXKpCY.jpg",
  "https://evbuddy.net/assets/cf_5-HzC36Q4e.jpg",
  "https://evbuddy.net/assets/cf_6-D-UdbTSo.jpg",
];

let currentIndex = 0;
const carouselContainer = document.getElementById('hero-carousel');

function initCarousel() {
  carouselImages.forEach((img, index) => {
    const slide = document.createElement('div');
    slide.className = `absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === 0 ? 'opacity-100' : 'opacity-0'}`;
    slide.innerHTML = `<img src="${img}" class="w-full h-full object-cover ${index === 0 ? 'animate-ken-burns' : ''}" alt="EV Buddy BG ${index + 1}">`;
    carouselContainer.appendChild(slide);
  });
}

function updateCarousel() {
  const slides = carouselContainer.querySelectorAll('div');
  slides.forEach((slide, index) => {
    if (index === currentIndex) {
      slide.classList.add('opacity-100');
      slide.classList.remove('opacity-0');
      slide.querySelector('img').classList.add('animate-ken-burns');
    } else {
      slide.classList.add('opacity-0');
      slide.classList.remove('opacity-100');
      slide.querySelector('img').classList.remove('animate-ken-burns');
    }
  });
}

document.getElementById('prev-btn').addEventListener('click', () => {
  currentIndex = (currentIndex === 0) ? carouselImages.length - 1 : currentIndex - 1;
  updateCarousel();
});

document.getElementById('next-btn').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % carouselImages.length;
  updateCarousel();
});

setInterval(() => {
  currentIndex = (currentIndex + 1) % carouselImages.length;
  updateCarousel();
}, 5000);

// 2. Sticky Navbar
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const logoContainer = document.getElementById('logo-container');
  const navLogo = document.getElementById('nav-logo');
  const navLinks = document.querySelectorAll('nav a');

  if (window.scrollY >= 80) {
    navbar.classList.add('fixed', 'bg-white/95', 'backdrop-blur-sm', 'shadow-sticky', 'dark:bg-gray-dark/95', 'dark:shadow-sticky-dark');
    navbar.classList.remove('absolute', 'bg-transparent');
    logoContainer.classList.add('py-5');
    logoContainer.classList.remove('py-8');
    navLogo.classList.remove('brightness-0', 'invert');
    navLinks.forEach(link => { if (!link.closest('.submenu')) { link.classList.add('text-dark', 'dark:text-white'); link.classList.remove('text-white'); } });
  } else {
    navbar.classList.add('absolute', 'bg-transparent');
    navbar.classList.remove('fixed', 'bg-white/95', 'backdrop-blur-sm', 'shadow-sticky', 'dark:bg-gray-dark/95', 'dark:shadow-sticky-dark');
    logoContainer.classList.add('py-8');
    logoContainer.classList.remove('py-5');
    navLogo.classList.add('brightness-0', 'invert');
    navLinks.forEach(link => { if (!link.closest('.submenu')) { link.classList.add('text-white'); link.classList.remove('text-dark', 'dark:text-white'); } });
  }
});

// 3. News Data & Modal
const newsData = [
  { id: 1, title: "NJ CSIT-Approved", snippet: "EV Buddy is NJ CSIT's sole approved charger...", image: "https://www.evbuddy.net/assets/Einpressware-q4ojpea_.pdf#page=1&view=FitH", link: "https://www.evbuddy.net/assets/Einpressware-q4ojpea_.pdf" },
  { id: 2, title: "Waitlist Open", snippet: "Drivers & Hosts earn delivering V2V charging...", image: "https://www.evbuddy.net/assets/evbuddy-waitlist-CZRXKxEg.pdf#page=1&view=FitH", link: "https://www.evbuddy.net/assets/evbuddy-waitlist-CZRXKxEg.pdf" },
  { id: 3, title: "EV Buddy x EcoG", snippet: "Strategic Hardware Agreement for V2V Solutions...", image: "https://www.evbuddy.net/assets/evbuddy-ecog-DmLFxWcc.pdf#page=1&view=FitH", link: "https://www.evbuddy.net/assets/evbuddy-ecog-DmLFxWcc.pdf" },
  { id: 4, title: "PlugIn Support", snippet: "PlugIn expressed support for EVChargeShare...", image: "https://www.evbuddy.net/assets/plugin-evbuddy-CzDcvWqy.pdf#page=1&view=FitH", link: "https://www.evbuddy.net/assets/plugin-evbuddy-CzDcvWqy.pdf" },
  { id: 5, title: "Crowdfunding Drive", snippet: "Coverage of mobile, grid-independent charging...", image: "https://www.evbuddy.net/assets/pierce-article-Bz0nHbhM.pdf#page=1&view=FitH", link: "https://www.evbuddy.net/assets/pierce-article-Bz0nHbhM.pdf" },
  { id: 6, title: "ITServe Award", snippet: "Popular Choice Award at ITServe Phoenix...", image: "https://www.evbuddy.net/assets/itserve-award-CjSkpRC2.pdf#page=1&view=FitH", link: "https://www.evbuddy.net/assets/itserve-award-CjSkpRC2.pdf" },
  { id: 7, title: "Tim Echols Support", snippet: "Gratitude for GA Commissioner Tim Echols support...", image: "https://www.evbuddy.net/assets/ev-buddy-support-letter-BqXUoMpj.pdf#page=1&view=FitH", link: "https://www.evbuddy.net/assets/ev-buddy-support-letter-BqXUoMpj.pdf" },
];

let newsIndex = 0;
const newsGrid = document.getElementById('news-grid');
const newsModal = document.getElementById('news-modal');
const modalFrame = document.getElementById('modal-frame');

function openNewsModal(link) {
  modalFrame.src = `${link}#toolbar=0&navpanes=0&view=FitH`;
  newsModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

document.getElementById('close-modal').onclick = () => {
  newsModal.classList.add('hidden');
  modalFrame.src = '';
  document.body.style.overflow = 'auto';
};

function updateNews() {
  newsGrid.innerHTML = '';
  for (let i = 0; i < 4; i++) {
    const item = newsData[(newsIndex + i) % newsData.length];
    const card = document.createElement('div');
    card.className = "flex flex-col overflow-hidden rounded-lg bg-white dark:bg-dark shadow-three transition duration-300 hover:shadow-two h-full";
    card.innerHTML = `
            <div class="h-[220px] cursor-pointer bg-gray-100 overflow-hidden" onclick="window.openNewsModal('${item.link}')">
                <object data="${item.image}" type="application/pdf" class="pointer-events-none w-full h-full object-cover"></object>
            </div>
            <div class="p-6 flex flex-col flex-grow">
                <h3 class="mb-3 text-lg font-bold text-dark dark:text-white line-clamp-2 cursor-pointer hover:text-primary transition" onclick="window.openNewsModal('${item.link}')">${item.title}</h3>
                <p class="mb-4 text-sm text-[#959cb1] line-clamp-3">${item.snippet}</p>
                <button class="mt-auto bg-primary text-white text-xs font-bold py-2 px-4 rounded-full self-start hover:bg-primary/80 transition" onclick="window.openNewsModal('${item.link}')">Read More</button>
            </div>
        `;
    newsGrid.appendChild(card);
  }
}
window.openNewsModal = openNewsModal;

document.getElementById('news-prev').onclick = () => { newsIndex = (newsIndex - 1 + newsData.length) % newsData.length; updateNews(); };
document.getElementById('news-next').onclick = () => { newsIndex = (newsIndex + 1) % newsData.length; updateNews(); };

// 4. Video Gallery
const videoData = [
  { title: "Ford Mustang Mach-E", description: "V2V DC Fast Charging", image: "https://img.youtube.com/vi/FftTmlqWY8E/maxresdefault.jpg", url: "https://www.youtube.com/embed/FftTmlqWY8E" },
  { title: "Rivian R1S", description: "V2V Charging Tech", image: "https://img.youtube.com/vi/k6jN05bGd-M/maxresdefault.jpg", url: "https://www.youtube.com/embed/k6jN05bGd-M" },
  { title: "BrightDrop Van", description: "Fleet Commercial Charging", image: "https://img.youtube.com/vi/5yVLIUprufU/maxresdefault.jpg", url: "https://www.youtube.com/embed/5yVLIUprufU" },
  { title: "BMW EV", description: "Premium Charging Experience", image: "https://img.youtube.com/vi/yDnGEg9jE9E/maxresdefault.jpg", url: "https://www.youtube.com/embed/yDnGEg9jE9E" },
];

function initVideos() {
  const scroll = document.getElementById('video-scroll');
  videoData.forEach(v => {
    const item = document.createElement('div');
    item.className = "min-w-full sm:min-w-[45%] lg:min-w-[23%] snap-start px-2";
    item.innerHTML = `<div class="bg-[#2C303B] rounded-lg overflow-hidden group shadow-three h-full"><div class="aspect-video relative cursor-pointer" onclick="window.openNewsModal('${v.url}')"><img src="${v.image}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500"><div class="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"><div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center"><svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div></div></div><div class="p-5"><h4 class="text-white font-bold mb-2">${v.title}</h4><p class="text-xs text-[#959cb1]">${v.description}</p></div></div>`;
    scroll.appendChild(item);
  });
}

// 5. Installation Features
const installFeatures = [
  { t: "Scalable Power", d: "Dynamic Power Allocation for efficiency." },
  { t: "32\" Multimedia", d: "Intuitive interaction and advertising." },
  { t: "Smart Cable", d: "Safe and future-proof management." },
  { t: "Certified Safety", d: "Built to international standards." },
];
function initInstall() {
  const grid = document.getElementById('installation-features');
  installFeatures.forEach(f => {
    const d = document.createElement('div');
    d.className = "bg-[#171c28] p-6 rounded-lg border border-white/5 hover:border-primary transition group";
    d.innerHTML = `<h5 class="text-white font-bold mb-2 group-hover:text-primary transition">${f.t}</h5><p class="text-sm text-[#959cb1]">${f.d}</p>`;
    grid.appendChild(d);
  });
}

// 6. Count-Up Animation
function countUp() {
  const counters = document.querySelectorAll('.count');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const update = () => {
      const current = +counter.innerText;
      const inc = target / 50;
      if (current < target) {
        counter.innerText = Math.ceil(current + inc);
        setTimeout(update, 30);
      } else { counter.innerText = target; }
    };
    update();
  });
}

// 7. Intersection Observer for Reveals
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-reveal-active');
      if (entry.target.id === 'stat-cards') countUp();
    }
  });
}, { threshold: 0.1 });

// 8. Mobile Navbar
const navToggle = document.getElementById('navbar-toggle');
const mobileNav = document.getElementById('navbar-collapse');
navToggle.onclick = () => {
  mobileNav.classList.toggle('visible');
  mobileNav.classList.toggle('opacity-100');
  mobileNav.classList.toggle('top-full');
  mobileNav.classList.toggle('invisible');
  mobileNav.classList.toggle('top-[120%]');
  mobileNav.classList.toggle('opacity-0');
  const spans = navToggle.querySelectorAll('span');
  spans[0].classList.toggle('translate-y-[7px]'); spans[0].classList.toggle('rotate-45'); spans[0].classList.toggle('my-1.5');
  spans[1].classList.toggle('opacity-0'); spans[1].classList.toggle('my-1.5');
  spans[2].classList.toggle('-translate-y-[7px]'); spans[2].classList.toggle('-rotate-45'); spans[2].classList.toggle('my-1.5');
};

// 9. Indicators
const indicators = document.getElementById('indicators');
function initIndicators() {
  carouselImages.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.className = `h-1.5 transition-all duration-300 rounded-full ${i === 0 ? 'w-8 bg-primary' : 'w-4 bg-white/40'}`;
    btn.onclick = () => { currentIndex = i; updateCarousel(); };
    indicators.appendChild(btn);
  });
}
function updateIndicators() {
  const btns = indicators.querySelectorAll('button');
  btns.forEach((btn, i) => {
    if (i === currentIndex) { btn.classList.add('w-8', 'bg-primary'); btn.classList.remove('w-4', 'bg-white/40'); }
    else { btn.classList.remove('w-8', 'bg-primary'); btn.classList.add('w-4', 'bg-white/40'); }
  });
}
const oldUpdateCarousel = updateCarousel;
updateCarousel = () => { oldUpdateCarousel(); updateIndicators(); };

// 10. Preorder Form Logic
const states = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

function initPreorder() {
  const stateSelect = document.getElementById('state-select');
  if (stateSelect) {
    states.forEach(state => {
      const opt = document.createElement('option');
      opt.value = state;
      opt.textContent = state;
      stateSelect.appendChild(opt);
    });
  }

  const typePersonal = document.getElementById('type-personal');
  const typeCompany = document.getElementById('type-company');
  const companyField = document.getElementById('company-field');

  if (typePersonal && typeCompany && companyField) {
    typePersonal.onclick = () => {
      typePersonal.className = "w-1/2 py-3 rounded-xs border text-base font-medium transition bg-primary text-white border-primary";
      typeCompany.className = "w-1/2 py-3 rounded-xs border text-base font-medium transition border-gray-600 text-gray-400 bg-transparent hover:border-primary";
      companyField.classList.add('hidden');
    };
    typeCompany.onclick = () => {
      typeCompany.className = "w-1/2 py-3 rounded-xs border text-base font-medium transition bg-primary text-white border-primary";
      typePersonal.className = "w-1/2 py-3 rounded-xs border text-base font-medium transition border-gray-600 text-gray-400 bg-transparent hover:border-primary";
      companyField.classList.remove('hidden');
    };
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  initIndicators();
  updateNews();
  initVideos();
  initInstall();
  initPreorder();
  document.querySelectorAll('.animate-reveal, #stat-cards').forEach(el => observer.observe(el));
});
