document.addEventListener('DOMContentLoaded', () => {

    // Header Scroll Effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
            navbar.style.padding = "10px 0";
        } else {
            navbar.style.boxShadow = "none";
            navbar.style.padding = "20px 0";
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Simple animation for hamburger
        const spans = hamburger.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Smooth scroll for anchor links (fallback for older browsers, though CSS does most of it)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Add animation classes to elements you want to animate on scroll
    // (This part assumes we add some CSS for .animate-in later if we want more fancy scroll reveals)
});


// Portfolio Modal Logic with Gallery
const modal = document.getElementById('portfolio-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const closeModal = document.querySelector('.close-modal');
const prevBtn = document.querySelector('.prev-slide');
const nextBtn = document.querySelector('.next-slide');

let currentImages = [];
let currentIndex = 0;

document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
        const title = item.querySelector('.portfolio-overlay h3').innerText;
        const desc = item.querySelector('.portfolio-overlay p').innerText;

        // Define image arrays for specific projects
        if (title === "Keyword Research") {
            currentImages = [
                "assets/keyword-research-detail.png",
                "assets/keyword-research.png",
            ];
        } else if (title === "PPC Audit Report") {
            // Example of handling other items
            currentImages = [
                "assets/PPC.jpeg",
                "assets/PPC1.jpeg",
            ];
        } else if (title === "Listing Audit") {
            // Example of handling other items
            currentImages = [
                "assets/listing.jpeg",
                "assets/listing1.jpeg",
                "assets/listing2.jpeg",
            ];
        } else if (title === "Holistic Brand Growth") {
            // Example of handling other items
            currentImages = [
                "assets/Brand_grouth.jpeg",
                "assets/Brandgrouth1.jpeg",
            ];
        } else if (title === "The 14 Days Profit Sprint") {
            // Example of handling other items
            currentImages = [
                "assets/profit.jpeg",
                "assets/profit1.jpeg",
            ];
        }else if (title === "Product Validation") {
            // Example of handling other items
            currentImages = [
                "assets/product_validation.jpeg",
            ];
        }else {
            // Default single image fallback
            const imgTag = item.querySelector('.portfolio-thumb');
            if (imgTag) {
                currentImages = [imgTag.src];
            } else {
                // Fallback if no thumb class found, try generic img
                const genericImg = item.querySelector('img');
                if (genericImg) currentImages = [genericImg.src];
                else return;
            }
        }

        currentIndex = 0;
        updateModalImage(title, desc);

        modal.style.display = "flex";
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    });
});

function updateModalImage(title, desc) {
    if (currentImages.length > 0) {
        modalImg.style.opacity = '0';
        setTimeout(() => {
            modalImg.src = currentImages[currentIndex];
            modalImg.onload = () => {
                modalImg.style.opacity = '1';
            };
        }, 200);
    }

    if (title) modalTitle.innerText = title;
    if (desc) modalDesc.innerText = desc;

    // Show/Hide buttons based on number of images
    if (currentImages.length > 1) {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
    } else {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
    }
}

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent modal from closing
    currentIndex++;
    if (currentIndex >= currentImages.length) {
        currentIndex = 0;
    }
    updateModalImage();
});

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent modal from closing
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = currentImages.length - 1;
    }
    updateModalImage();
});

closeModal.addEventListener('click', () => {
    closeModalFunc();
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunc();
    }
});

function closeModalFunc() {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
}



    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    });

