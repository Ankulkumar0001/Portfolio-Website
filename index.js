const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const offCanvas = document.getElementById('offCanvas');
const overlay = document.getElementById('overlay');
const menuPanel = document.getElementById('menuPanel');
const menuLinks = document.querySelectorAll('.menu-link');

function openMenu() {
    offCanvas.classList.remove('hidden');
    setTimeout(() => {
        overlay.classList.remove('opacity-0');
        menuPanel.classList.remove('translate-x-full');
    }, 10);
}

function closeMenu() {
    overlay.classList.add('opacity-0');
    menuPanel.classList.add('translate-x-full');
    setTimeout(() => offCanvas.classList.add('hidden'), 300);
}

menuBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);
menuLinks.forEach(link => link.addEventListener('click', closeMenu));

const greetings = ['Hello', 'Namaste', 'Bonjour', 'Hola', 'Konnichiwa', 'Ciao'];
let greetingIndex = 0;
const greetingElement = document.getElementById('greeting');
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function typeWriter() {
    const currentGreeting = greetings[greetingIndex];
    if (!isDeleting && charIndex < currentGreeting.length) {
        greetingElement.textContent = currentGreeting.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeWriter, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
        greetingElement.textContent = currentGreeting.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeWriter, typingSpeed / 2);
    } else if (!isDeleting && charIndex === currentGreeting.length) {
        setTimeout(() => {
            isDeleting = true;
            typeWriter();
        }, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        greetingIndex = (greetingIndex + 1) % greetings.length;
        setTimeout(typeWriter, 500);
    }
}
typeWriter();

const navbar = document.querySelector('nav');
let scrollTimeout;
let lastScrollY = window.scrollY;

window.addEventListener('scroll', function () {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.style.transform = 'translateY(-100%)';
        navbar.style.transition = 'transform 0.5s ease-in-out';
    }
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        navbar.style.transform = 'translateY(0)';
        navbar.style.transition = 'transform 0.5s ease-in-out';
    }, 200);
    lastScrollY = currentScrollY;
});

const counters = document.querySelectorAll('.counter');
let counterAnimated = false;

function createBubbles(button) {
    for (let i = 0; i < 12; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = 8 + Math.random() * 12;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = '50%';
        bubble.style.top = '50%';
        const angle = (Math.random() * 360) * (Math.PI / 180);
        const distance = 30 + Math.random() * 20;
        bubble.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`;
        bubble.style.animationDelay = `${Math.random() * 0.2}s`;
        button.style.position = 'relative';
        button.appendChild(bubble);
        setTimeout(() => bubble.remove(), 1200);
    }
}

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const startTime = performance.now();
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuad = progress * (2 - progress);
            const current = Math.floor(easeOutQuad * target);
            counter.textContent = current;
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        requestAnimationFrame(updateCounter);
    });
};

const aboutSection = document.getElementById('about');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterAnimated) {
            animateCounters();
            counterAnimated = true;
        }
    });
}, { threshold: 0.3 });
observer.observe(aboutSection);

const lightbox = document.getElementById('imageLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const imageCounter = document.getElementById('imageCounter');
const closeLightbox = document.getElementById('closeLightbox');
const prevImage = document.getElementById('prevImage');
const nextImage = document.getElementById('nextImage');
let currentImages = [];
let currentIndex = 0;

document.querySelectorAll('.education-img').forEach((img, index) => {
    img.addEventListener('click', function () {
        const gallery = this.closest('.education-gallery');
        currentExpImages = Array.from(gallery.querySelectorAll('.education-img'));
        currentExpIndex = currentExpImages.indexOf(this);
        currentExpData = {
            title: gallery.dataset.title,
            company: gallery.dataset.company,
            location: gallery.dataset.location,
            desc: gallery.dataset.desc,
            logo: gallery.dataset.logo
        };
        showExpImage(currentExpIndex);
        openExpModal();
    });
});

function showImage(index) {
    lightboxImage.style.transform = 'scale(0.9)';
    lightboxImage.style.opacity = '0';
    setTimeout(() => {
        lightboxImage.src = currentImages[index].src;
        imageCounter.textContent = `${index + 1} / ${currentImages.length}`;
        const allGalleryImgs = document.querySelectorAll('.gallery-img');
        if (allGalleryImgs[index]) {
            const galleryBtn = allGalleryImgs[index].querySelector('.gallery-like-btn');
            if (galleryBtn) {
                currentGalleryId = galleryBtn.dataset.galleryId;
                updateLightboxLike();
            }
        }
        lightboxImage.style.transform = 'scale(1)';
        lightboxImage.style.opacity = '1';
    }, 150);
}

function openLightbox() {
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
}

function closeLightboxFunc() {
    lightbox.style.opacity = '0';
    lightboxImage.style.transform = 'scale(0.9)';
    lightboxLikeBtn.style.display = 'none';
    setTimeout(() => {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
    }, 300);
}

closeLightbox.addEventListener('click', closeLightboxFunc);

const prevHandler = () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    showImage(currentIndex);
};
const nextHandler = () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    showImage(currentIndex);
};

prevImage.addEventListener('click', prevHandler);
document.getElementById('prevImageMobile').addEventListener('click', prevHandler);
nextImage.addEventListener('click', nextHandler);
document.getElementById('nextImageMobile').addEventListener('click', nextHandler);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightboxFunc();
    }
});

document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('flex')) {
        if (e.key === 'Escape') closeLightboxFunc();
        if (e.key === 'ArrowLeft') prevImage.click();
        if (e.key === 'ArrowRight') nextImage.click();
    }
});

const expModal = document.getElementById('experienceModal');
const expModalImage = document.getElementById('expModalImage');
const expImageCounter = document.getElementById('expImageCounter');
const closeExpModal = document.getElementById('closeExpModal');
const prevExpImage = document.getElementById('prevExpImage');
const nextExpImage = document.getElementById('nextExpImage');
const expModalTitle = document.getElementById('expModalTitle');
const expModalCompanyName = document.getElementById('expModalCompanyName');
const expModalLocation = document.getElementById('expModalLocation');
const expModalDesc = document.getElementById('expModalDesc');
const expModalLogo = document.getElementById('expModalLogo');
let currentExpImages = [];
let currentExpIndex = 0;
let currentExpData = {};

document.querySelectorAll('.experience-img').forEach((img) => {
    img.addEventListener('click', function () {
        const gallery = this.closest('.experience-gallery');
        currentExpImages = Array.from(gallery.querySelectorAll('.experience-img'));
        currentExpIndex = currentExpImages.indexOf(this);
        currentExpData = {
            title: gallery.dataset.title,
            company: gallery.dataset.company,
            location: gallery.dataset.location,
            desc: gallery.dataset.desc,
            logo: gallery.dataset.logo
        };
        showExpImage(currentExpIndex);
        openExpModal();
    });
});

function showExpImage(index) {
    expModalImage.style.opacity = '0';
    expModalImage.style.transform = 'scale(0.95)';
    setTimeout(() => {
        expModalImage.src = currentExpImages[index].src;
        expImageCounter.textContent = `${index + 1} / ${currentExpImages.length}`;
        expModalTitle.textContent = currentExpData.title;
        expModalCompanyName.textContent = currentExpData.company;
        expModalLocation.innerHTML = `<i class="fas fa-map-marker-alt text-indigo-400"></i> ${currentExpData.location}`;
        expModalDesc.textContent = currentExpData.desc;
        expModalLogo.src = currentExpData.logo;
        expModalImage.style.opacity = '1';
        expModalImage.style.transform = 'scale(1)';
    }, 200);
}

function openExpModal() {
    expModal.classList.remove('hidden');
    expModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    setTimeout(() => expModal.style.opacity = '1', 10);
}

function closeExpModalFunc() {
    expModal.style.opacity = '0';
    document.body.style.overflow = '';
    setTimeout(() => {
        expModal.classList.add('hidden');
        expModal.classList.remove('flex');
    }, 300);
}

closeExpModal.addEventListener('click', closeExpModalFunc);
prevExpImage.addEventListener('click', () => {
    currentExpIndex = (currentExpIndex - 1 + currentExpImages.length) % currentExpImages.length;
    showExpImage(currentExpIndex);
});
nextExpImage.addEventListener('click', () => {
    currentExpIndex = (currentExpIndex + 1) % currentExpImages.length;
    showExpImage(currentExpIndex);
});
expModal.addEventListener('click', (e) => {
    if (e.target === expModal) closeExpModalFunc();
});
document.addEventListener('keydown', (e) => {
    if (expModal.classList.contains('flex')) {
        if (e.key === 'Escape') closeExpModalFunc();
        if (e.key === 'ArrowLeft') prevExpImage.click();
        if (e.key === 'ArrowRight') nextExpImage.click();
    }
});

const backToTop = document.getElementById('backToTop');
const heroSection = document.getElementById('home');

window.addEventListener('scroll', function () {
    const heroHeight = heroSection.offsetHeight;
    if (window.scrollY > heroHeight) {
        backToTop.classList.remove('opacity-0', 'invisible');
        backToTop.classList.add('opacity-100', 'visible');
    } else {
        backToTop.classList.remove('opacity-100', 'visible');
        backToTop.classList.add('opacity-0', 'invisible');
    }
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const mobileLinks = document.querySelectorAll('.menu-link');

window.addEventListener('scroll', function () {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    mobileLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});


$(document).ready(function () {
    $('.carousel-ltr').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplaySpeed: 5000,
        autoplayHoverPause: false,
        responsive: {
            0: { items: 2 },
            600: { items: 3 },
            1000: { items: 5 }
        }
    });
    $('.carousel-rtl').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplaySpeed: 5000,
        autoplayHoverPause: false,
        rtl: true,
        responsive: {
            0: { items: 2 },
            600: { items: 3 },
            1000: { items: 5 }
        }
    });
});

let currentProjectRow = 0;
const viewMoreBtn = document.getElementById('viewMoreBtn');
viewMoreBtn.addEventListener('click', function () {
    if (currentProjectRow === 0) {
        document.querySelectorAll('.project-row-2').forEach(el => el.classList.remove('hidden'));
        currentProjectRow = 1;
        viewMoreBtn.querySelector('span:last-child').innerHTML = 'View More Projects <i class="fas fa-chevron-down group-hover:animate-bounce"></i>';
    } else if (currentProjectRow === 1) {
        document.querySelectorAll('.project-row-3').forEach(el => el.classList.remove('hidden'));
        currentProjectRow = 2;
        viewMoreBtn.querySelector('span:last-child').innerHTML = 'View Less <i class="fas fa-chevron-up group-hover:animate-bounce"></i>';
    } else {
        document.querySelectorAll('.project-row-2, .project-row-3').forEach(el => el.classList.add('hidden'));
        currentProjectRow = 0;
        viewMoreBtn.querySelector('span:last-child').innerHTML = 'View More Projects <i class="fas fa-chevron-down group-hover:animate-bounce"></i>';
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    }
});

const projectModal = document.getElementById('projectModal');
const closeProjectModal = document.getElementById('closeProjectModal');
const projectModalTitle = document.getElementById('projectModalTitle');
const projectModalDesc = document.getElementById('projectModalDesc');
const projectModalTags = document.getElementById('projectModalTags');
const projectModalLink = document.getElementById('projectModalLink');
const projectModalIconEl = document.getElementById('projectModalIconEl');
const projectModalIconContainer = document.getElementById('projectModalIconContainer');

const projectsData = [
    {
        id: "project1",
        title: "Online Learning Platform",
        desc: "Welcome to Genesis Learning, the ultimate digital frontier where your academic evolution takes center stage! 🚀 We believe that education should be as limitless as your ambition, which is why we’ve built a premier online study platform designed to bridge the gap between potential and mastery. 🌟\n\nUnlike traditional platforms, we are a community dedicated to sparking curiosity and driving real-world results. 🌍 From foundational concepts to cutting-edge skills, we provide the roadmap to your success. Join us today and transform the way you learn, grow, and achieve. 🎓\n\nGenesis Learning: Empowering your journey to master the future! ✨.",
        tags: ["Asp .NET", "MSSQL", "JavaScript", "Chart.js", "HTML & CSS", "Bootstrap", "Tailwind"],
        link: "https://genesislearning.runasp.net/",
        icon: "fas fa-shopping-cart",
        gradient: "from-indigo-500 to-purple-600",
        image: "/genesisi learning (1).png",
        colorTheme: "indigo",
        hoverBorder: "hover:border-indigo-200"
    },
    {
        id: "project2",
        title: "Personal Portfolio Website",
        desc: "Hi! I’m Ankul Kumar, and I love building cool things for the web. 🚀I am a developer who enjoys turning ideas into real websites and apps. My goal is simple: to create tools that are easy to use, look great, and work perfectly. 💻✨I spend my time learning new skills and solving tricky problems with code. Whether it’s a small project or a big idea, I give it my best effort every time. 🛠️🌟Take a look at my work below! I’m always open to new projects and meeting new people. Let’s connect and create something awesome together! 🤝🔥",
        tags: ["JavaScript", "HTML", "CSS", "Bootstrap", "Tailwind"],
        link: "#",
        icon: "fas fa-tasks",
        gradient: "from-red-500 to-pink-500",
        image: "/portfolio.png",
        colorTheme: "pink",
        hoverBorder: "hover:border-red-200"
    },
    {
        id: "project3",
        title: "Resume Maker Website",
        desc: "Build your dream career with our professional Resume Maker, the ultimate tool designed to help you stand out in a crowded job market! 🚀 Whether you are a fresh graduate or an experienced pro, our platform makes crafting a polished, recruiter-approved resume fast and effortless. 📝✨ Choose from dozens of modern, elegant templates and customize every detail to reflect your unique skills and personality. 🎨 With real-time previews, expert tips, and easy PDF downloads, you can go from a blank page to a stunning application in just minutes. ⏱️💎 Stop worrying about formatting and start focusing on your future! 📈 Create a powerful resume today and land that interview you’ve been dreaming of! 🤝🔥",
        tags: ["Asp .NET", "MSSQL", "HTML", "CSS3", "Bootstrap"],
        link: "https://resumemaker.runasp.net/",
        icon: "fas fa-cloud-sun",
        gradient: "from-orange-500 to-pink-600",
        image: "/resumemaker.png",
        colorTheme: "orange",
        hoverBorder: "hover:border-orange-200"
    },
    {
        id: "project4",
        title: "E-Commerce Website",
        desc: "Step into the future of online shopping with our stunning E-Commerce frontend, where modern design meets a seamless user experience! 🛍️✨ This project focuses on a sleek, high-performance interface built to captivate shoppers from the very first click. 🚀 Featuring a fully responsive layout, it looks beautiful on any device, ensuring your products shine whether on mobile or desktop. 📱💻 Enjoy smooth navigation with interactive product galleries, intuitive filters, and a lightning-fast shopping cart experience. 🛒💨 Crafted with clean code and a sharp eye for aesthetics, this frontend proves that style and functionality can go hand-in-hand. 🎨💎 Explore the collection, experience the fluid animations, and see how we bring digital storefronts to life with elegance and ease! 🌟🔥.",
        tags: ["HTML", "CSS3", "JavaScript", "Bootstrap", "Tailwind"],
        link: "https://ankul-e-commerce.netlify.app/",
        icon: "fas fa-blog",
        gradient: "from-green-500 to-teal-600",
        image: "/e-commerece.png",
        colorTheme: "green",
        hoverBorder: "hover:border-green-200"
    },
    {
        id: "project5",
        title: "NGO Website",
        desc: "Welcome to our NGO's digital home, a dedicated space where compassion meets action to create a lasting impact in our community! 🌍✨ Our mission is to empower the underserved and provide essential resources to those who need them most, ensuring a brighter and more equitable future for all. 🤝💡 Through grassroots initiatives and the support of our incredible volunteers, we tackle urgent challenges like education, healthcare, and environmental sustainability. 🌱📚 Every click, donation, and shared story helps us get one step closer to a world filled with hope and opportunity. 🕊️🙌 Explore our latest projects, read our success stories, and discover how you can become a catalyst for change today. 🚀💖 Together, we can transform lives and build a legacy of kindness that echoes for generations to come! 🌟🔥.",
        tags: ["Asp .NET", "MSSQL", "HTML5", "CSS3", "Bootstrap"],
        link: "https://sdhngo.netlify.app/",
        icon: "fas fa-video",
        gradient: "from-red-500 to-orange-600",
        image: "/genesisi learning (2).png",
        colorTheme: "red",
        hoverBorder: "hover:border-red-200"
    },
    // {
    //     id: "project6",
    //     title: "",
    //     desc: "NEXT PROJECT SOON",
    //     tags: [],
    //     link: "#",
    //     icon: "fas fa-utensils",
    //     gradient: "from-yellow-500 to-amber-600",
    //     image: "/Gemini_Generated_Image_ealmpzealmpzealm.png",
    //     colorTheme: "yellow",
    //     hoverBorder: "hover:border-yellow-200"
    // },
    // {
    //     id: "project7",
    //     title: "Chat Application",
    //     desc: "Real-time messaging app with group chats, video calls, voice messages, file sharing, emoji reactions, read receipts, and end-to-end encryption for secure communication.",
    //     tags: ["Socket.io", "WebRTC", "Redis"],
    //     link: "#",
    //     icon: "fas fa-comments",
    //     gradient: "from-purple-500 to-pink-600",
    //     image: "/Gemini_Generated_Image_ealmpzealmpzealm.png",
    //     colorTheme: "purple",
    //     hoverBorder: "hover:border-purple-200"
    // },
    // {
    //     id: "project8",
    //     title: "Analytics Dashboard",
    //     desc: "Business intelligence dashboard with data visualization tools, interactive charts, real-time metrics, custom reports, KPI tracking, and advanced filtering for comprehensive data analysis.",
    //     tags: ["D3.js", "Python", "Pandas"],
    //     link: "#",
    //     icon: "fas fa-chart-line",
    //     gradient: "from-cyan-500 to-blue-600",
    //     image: "/Gemini_Generated_Image_ealmpzealmpzealm.png",
    //     colorTheme: "cyan",
    //     hoverBorder: "hover:border-cyan-200"
    // },
    // {
    //     id: "project9",
    //     title: "Fitness Tracker",
    //     desc: "Comprehensive fitness tracking application with workout plans, calorie counter, progress monitoring, exercise library, goal setting, and social features for motivation and accountability.",
    //     tags: ["React Native", "MongoDB", "Express"],
    //     link: "#",
    //     icon: "fas fa-dumbbell",
    //     gradient: "from-teal-500 to-green-600",
    //     image: "/Gemini_Generated_Image_ealmpzealmpzealm.png",
    //     colorTheme: "teal",
    //     hoverBorder: "hover:border-teal-200"
    // }
];

function renderProjects() {
    const projectsContainer = document.getElementById('projectsGrid'); // Ensure this ID is in HTML
    if (!projectsContainer) return;

    projectsContainer.innerHTML = '';

    projectsData.forEach((project, index) => {
        let visibilityClass = '';
        if (index >= 3 && index < 6) {
            visibilityClass = 'project-row-2 hidden';
        } else if (index >= 6) {
            visibilityClass = 'project-row-3 hidden';
        }

        const tagsHtml = project.tags.map(tag =>
            `<span class="text-xs bg-gradient-to-r from-${project.colorTheme}-50 to-${project.colorTheme}-100 text-${project.colorTheme}-700 px-3 py-1.5 rounded-full font-semibold border border-${project.colorTheme}-200 hover:scale-105 transition-transform cursor-pointer">${tag}</span>`
        ).join('');

        const cardHtml = `
            <div class="group bg-slate-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-2 border-transparent ${project.hoverBorder} cursor-pointer project-card ${visibilityClass}"
                 data-id="${index}" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="200">
                <div class="relative h-56 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-black/20 transition-all"></div>
                    <img src="${project.image}" class="text-white/90 relative z-10 group-hover:scale-105 transition-all duration-500 h-full w-full object-fill">
                </div>
                <div class="p-6">
                    <div class="flex items-start justify-between gap-2 mb-3">
                        <h3 class="text-2xl font-bold text-gray-900 group-hover:text-${project.colorTheme}-600 transition-colors flex-1">${project.title}</h3>
                        <button class="project-like-btn flex items-center gap-1.5 bg-white hover:bg-red-50 px-2.5 py-1.5 rounded-full border border-${project.colorTheme}-200 hover:border-red-300 transition-all duration-300 group/like" data-project-id="${project.id}">
                             <i class="far fa-heart text-gray-500 group-hover/like:text-red-500 transition-colors project-heart text-sm"></i>
                             <span class="text-xs font-bold text-gray-700 group-hover/like:text-red-500 transition-colors project-count">0</span>
                        </button>
                    </div>
                    <p class="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">${project.desc}</p>
                    <div class="flex gap-2 flex-wrap mb-4">
                        ${tagsHtml}
                    </div>
                    <a href="${project.link}" target="_blank" class="inline-flex items-center gap-2 text-${project.colorTheme}-600 hover:text-${project.colorTheme}-700 font-bold text-sm group/link bg-${project.colorTheme}-50 px-4 py-2 rounded-lg hover:bg-${project.colorTheme}-100 transition-all" onclick="event.stopPropagation()">
                        View Project <i class="fas fa-arrow-right group-hover/link:translate-x-2 transition-transform"></i>
                    </a>
                </div>
            </div>
        `;
        projectsContainer.insertAdjacentHTML('beforeend', cardHtml);
    });

    initializeProjectEvents();
}

function initializeProjectEvents() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function () {
            const index = this.dataset.id;
            const project = projectsData[index];

            projectModalTitle.textContent = project.title;
            projectModalDesc.textContent = project.desc;

            // Image handling - simpler now since we always have an image in data
            const projectModalImage = document.getElementById('projectModalImage');
            projectModalImage.src = project.image;
            projectModalImage.style.display = 'block';
            projectModalIconContainer.style.display = 'none';

            projectModalTags.innerHTML = project.tags.map(tag =>
                `<span class="text-xs bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full font-semibold border border-indigo-200">${tag}</span>`
            ).join('');

            projectModalLink.href = project.link;
            projectModal.classList.remove('hidden');
            projectModal.classList.add('flex');
            document.body.style.overflow = 'hidden';
            setTimeout(() => projectModal.style.opacity = '1', 10);
        });
    });

    // Re-attach like button listeners
    document.querySelectorAll('.project-like-btn').forEach(btn => {
        const projectId = btn.dataset.projectId;
        const heart = btn.querySelector('.project-heart');
        const count = btn.querySelector('.project-count');
        const likeCount = parseInt(localStorage.getItem(projectId) || '0');
        const isLiked = localStorage.getItem(`${projectId}_liked`) === 'true';
        count.textContent = likeCount;
        if (isLiked) {
            heart.classList.remove('far');
            heart.classList.add('fas');
        }
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const currentLikes = parseInt(count.textContent);
            const currentlyLiked = heart.classList.contains('fas');
            heart.classList.add('heart-animate');
            setTimeout(() => heart.classList.remove('heart-animate'), 600);
            if (!currentlyLiked) createBubbles(this);
            if (currentlyLiked) {
                count.textContent = currentLikes - 1;
                heart.classList.remove('fas');
                heart.classList.add('far');
                localStorage.setItem(projectId, currentLikes - 1);
                localStorage.setItem(`${projectId}_liked`, 'false');
            } else {
                count.textContent = currentLikes + 1;
                heart.classList.remove('far');
                heart.classList.add('fas');
                localStorage.setItem(projectId, currentLikes + 1);
                localStorage.setItem(`${projectId}_liked`, 'true');
            }
        });
    });
}

// Initialize on load
renderProjects();

closeProjectModal.addEventListener('click', function () {
    projectModal.style.opacity = '0';
    document.body.style.overflow = '';
    setTimeout(() => {
        projectModal.classList.add('hidden');
        projectModal.classList.remove('flex');
    }, 300);
});

projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        closeProjectModal.click();
    }
});


document.querySelectorAll('.cert-like-btn').forEach(btn => {
    const certId = btn.dataset.certId;
    const heart = btn.querySelector('.cert-heart');
    const count = btn.querySelector('.cert-count');
    const likeCount = parseInt(localStorage.getItem(certId) || '0');
    const isLiked = localStorage.getItem(`${certId}_liked`) === 'true';
    count.textContent = likeCount;
    if (isLiked) {
        heart.classList.remove('far');
        heart.classList.add('fas');
    }
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const currentLikes = parseInt(count.textContent);
        const currentlyLiked = heart.classList.contains('fas');
        heart.classList.add('heart-animate');
        setTimeout(() => heart.classList.remove('heart-animate'), 600);
        if (!currentlyLiked) createBubbles(this);
        if (currentlyLiked) {
            count.textContent = currentLikes - 1;
            heart.classList.remove('fas');
            heart.classList.add('far');
            localStorage.setItem(certId, currentLikes - 1);
            localStorage.setItem(`${certId}_liked`, 'false');
        } else {
            count.textContent = currentLikes + 1;
            heart.classList.remove('far');
            heart.classList.add('fas');
            localStorage.setItem(certId, currentLikes + 1);
            localStorage.setItem(`${certId}_liked`, 'true');
        }
    });
});

document.querySelectorAll('.certificate-img').forEach(img => {
    img.addEventListener('click', function () {
        lightboxImage.src = this.src;
        imageCounter.style.display = 'none';
        prevImage.style.display = 'none';
        nextImage.style.display = 'none';
        document.getElementById('prevImageMobile').style.display = 'none';
        document.getElementById('nextImageMobile').style.display = 'none';
        lightboxLikeBtn.style.display = 'none';
        openLightbox();
    });
});

const funFactLikeBtn = document.getElementById('funFactLikeBtn');
const funFactHeart = document.getElementById('funFactHeart');
const funFactLikeCount = document.getElementById('funFactLikeCount');
const funFactId = 'funFact';
const funFactLikes = parseInt(localStorage.getItem(funFactId) || '0');
const funFactLiked = localStorage.getItem(`${funFactId}_liked`) === 'true';
funFactLikeCount.textContent = funFactLikes;
if (funFactLiked) {
    funFactHeart.classList.remove('far');
    funFactHeart.classList.add('fas');
    funFactHeart.classList.add('text-red-500');
}
funFactLikeBtn.addEventListener('click', function () {
    const currentLikes = parseInt(funFactLikeCount.textContent);
    const currentlyLiked = funFactHeart.classList.contains('fas');
    funFactHeart.classList.add('heart-animate');
    setTimeout(() => funFactHeart.classList.remove('heart-animate'), 600);
    if (!currentlyLiked) createBubbles(this);
    if (currentlyLiked) {
        funFactLikeCount.textContent = currentLikes - 1;
        funFactHeart.classList.remove('fas', 'text-red-500');
        funFactHeart.classList.add('far');
        localStorage.setItem(funFactId, currentLikes - 1);
        localStorage.setItem(`${funFactId}_liked`, 'false');
    } else {
        funFactLikeCount.textContent = currentLikes + 1;
        funFactHeart.classList.remove('far');
        funFactHeart.classList.add('fas', 'text-red-500');
        localStorage.setItem(funFactId, currentLikes + 1);
        localStorage.setItem(`${funFactId}_liked`, 'true');
    }
});

let currentGalleryRow = 0;
const viewMoreGalleryBtn = document.getElementById('viewMoreGalleryBtn');
viewMoreGalleryBtn.addEventListener('click', function () {
    if (currentGalleryRow === 0) {
        document.querySelectorAll('.gallery-row-1').forEach(el => el.classList.remove('hidden'));
        currentGalleryRow = 1;
        viewMoreGalleryBtn.querySelector('span:last-child').innerHTML = 'View Less <i class="fas fa-chevron-up group-hover:animate-bounce"></i>';
    } else {
        document.querySelectorAll('.gallery-row-1').forEach(el => el.classList.add('hidden'));
        currentGalleryRow = 0;
        viewMoreGalleryBtn.querySelector('span:last-child').innerHTML = 'View More <i class="fas fa-chevron-down group-hover:animate-bounce"></i>';
        document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
    }
});

const galleryImages = document.querySelectorAll('.gallery-img');
const lightboxLikeBtn = document.getElementById('lightboxLikeBtn');
const lightboxHeart = document.getElementById('lightboxHeart');
const lightboxLikeCount = document.getElementById('lightboxLikeCount');
let currentGalleryId = null;

function updateLightboxLike() {
    if (!currentGalleryId) return;
    const likeCount = parseInt(localStorage.getItem(currentGalleryId) || '0');
    const isLiked = localStorage.getItem(`${currentGalleryId}_liked`) === 'true';
    lightboxLikeCount.textContent = likeCount;
    if (isLiked) {
        lightboxHeart.classList.remove('far');
        lightboxHeart.classList.add('fas');
    } else {
        lightboxHeart.classList.remove('fas');
        lightboxHeart.classList.add('far');
    }
}

lightboxLikeBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (!currentGalleryId) return;
    const currentLikes = parseInt(lightboxLikeCount.textContent);
    const currentlyLiked = lightboxHeart.classList.contains('fas');
    lightboxHeart.classList.add('heart-animate');
    setTimeout(() => lightboxHeart.classList.remove('heart-animate'), 600);
    if (!currentlyLiked) createBubbles(this);
    if (currentlyLiked) {
        lightboxLikeCount.textContent = currentLikes - 1;
        lightboxHeart.classList.remove('fas');
        lightboxHeart.classList.add('far');
        localStorage.setItem(currentGalleryId, currentLikes - 1);
        localStorage.setItem(`${currentGalleryId}_liked`, 'false');
    } else {
        lightboxLikeCount.textContent = currentLikes + 1;
        lightboxHeart.classList.remove('far');
        lightboxHeart.classList.add('fas');
        localStorage.setItem(currentGalleryId, currentLikes + 1);
        localStorage.setItem(`${currentGalleryId}_liked`, 'true');
    }
    const galleryBtn = document.querySelector(`.gallery-like-btn[data-gallery-id="${currentGalleryId}"]`);
    if (galleryBtn) {
        const galleryHeart = galleryBtn.querySelector('.gallery-heart');
        const galleryCount = galleryBtn.querySelector('.gallery-count');
        galleryCount.textContent = lightboxLikeCount.textContent;
        if (currentlyLiked) {
            galleryHeart.classList.remove('fas');
            galleryHeart.classList.add('far');
        } else {
            galleryHeart.classList.remove('far');
            galleryHeart.classList.add('fas');
        }
    }
});

let currentGalleryImages = [];
let currentGalleryIndex = 0;

function showGalleryImage(index) {
    lightboxImage.style.transform = 'scale(0.9)';
    lightboxImage.style.opacity = '0';
    setTimeout(() => {
        const imgElement = currentGalleryImages[index].querySelector('img');
        const galleryBtn = currentGalleryImages[index].querySelector('.gallery-like-btn');
        currentGalleryId = galleryBtn.dataset.galleryId;
        lightboxImage.src = imgElement.src;
        imageCounter.textContent = `${index + 1} / ${currentGalleryImages.length}`;
        updateLightboxLike();
        lightboxImage.style.transform = 'scale(1)';
        lightboxImage.style.opacity = '1';
    }, 150);
}

galleryImages.forEach((img, index) => {
    img.addEventListener('click', function () {
        currentGalleryImages = Array.from(galleryImages).filter(img => !img.classList.contains('hidden'));
        currentGalleryIndex = currentGalleryImages.indexOf(this);
        imageCounter.style.display = 'block';
        prevImage.style.display = 'flex';
        nextImage.style.display = 'flex';
        document.getElementById('prevImageMobile').style.display = 'flex';
        document.getElementById('nextImageMobile').style.display = 'flex';
        lightboxLikeBtn.style.display = 'flex';
        showGalleryImage(currentGalleryIndex);
        openLightbox();
    });
});

const prevGalleryHandler = () => {
    currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
    showGalleryImage(currentGalleryIndex);
};
const nextGalleryHandler = () => {
    currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryImages.length;
    showGalleryImage(currentGalleryIndex);
};

prevImage.addEventListener('click', prevGalleryHandler);
nextImage.addEventListener('click', nextGalleryHandler);
document.getElementById('prevImageMobile').addEventListener('click', prevGalleryHandler);
document.getElementById('nextImageMobile').addEventListener('click', nextGalleryHandler);

document.querySelectorAll('.gallery-like-btn').forEach(btn => {
    const galleryId = btn.dataset.galleryId;
    const heart = btn.querySelector('.gallery-heart');
    const count = btn.querySelector('.gallery-count');
    const likeCount = parseInt(localStorage.getItem(galleryId) || '0');
    const isLiked = localStorage.getItem(`${galleryId}_liked`) === 'true';
    count.textContent = likeCount;
    if (isLiked) {
        heart.classList.remove('far');
        heart.classList.add('fas');
    }
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const currentLikes = parseInt(count.textContent);
        const currentlyLiked = heart.classList.contains('fas');
        heart.classList.add('heart-animate');
        setTimeout(() => heart.classList.remove('heart-animate'), 600);
        if (!currentlyLiked) createBubbles(this);
        if (currentlyLiked) {
            count.textContent = currentLikes - 1;
            heart.classList.remove('fas');
            heart.classList.add('far');
            localStorage.setItem(galleryId, currentLikes - 1);
            localStorage.setItem(`${galleryId}_liked`, 'false');
        } else {
            count.textContent = currentLikes + 1;
            heart.classList.remove('far');
            heart.classList.add('fas');
            localStorage.setItem(galleryId, currentLikes + 1);
            localStorage.setItem(`${galleryId}_liked`, 'true');
        }
    });
});


// Scroll Progress Bar
// Scroll Progress Bar
let progressBarScrollTimeout;
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    const progressBar = document.getElementById('scroll-progress-bar');
    const percentageText = document.getElementById('scroll-percentage');
    const progressContainer = document.getElementById('scroll-progress-container');

    // Show the progress bar when scrolling
    if (progressContainer) {
        progressContainer.classList.remove('opacity-0');

        // Clear existing timeout
        clearTimeout(progressBarScrollTimeout);

        // Set timeout to hide after 0.3 seconds of no scrolling
        progressBarScrollTimeout = setTimeout(() => {
            progressContainer.classList.add('opacity-0');
        }, 300);
    }

    if (progressBar) {
        progressBar.style.width = scrolled + '%';
        if (percentageText) {
            percentageText.textContent = Math.round(scrolled) + '%';
            if (scrolled > 1) {
                percentageText.classList.remove('opacity-0', 'translate-x-1/2'); // Remove tailwind utility triggers
                percentageText.classList.add('percentage-pop');
            } else {
                percentageText.classList.add('opacity-0', 'translate-x-1/2');
                percentageText.classList.remove('percentage-pop');
            }
        }
    }
});

