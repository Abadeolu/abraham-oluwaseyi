// Wedding Website JavaScript
// This file contains all JavaScript functionality for the wedding website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Wedding website loaded successfully!');
    
    // Initialize any JavaScript functionality here
    initializeWebsite();
});

// Gallery Slider functionality
let currentSlide = 0;
const totalSlides = 12;
let slidesPerView = 5; // Default for desktop

function updateSlidesPerView() {
    const width = window.innerWidth;
    if (width <= 576) {
        slidesPerView = 1;
    } else if (width <= 768) {
        slidesPerView = 2;
    } else if (width <= 992) {
        slidesPerView = 3;
    } else if (width <= 1200) {
        slidesPerView = 4;
    } else {
        slidesPerView = 5;
    }
}

function updateGallerySlider() {
    const slider = document.getElementById('gallerySlider');
    if (slider) {
        const slideWidth = 100 / slidesPerView;
        const translateX = -(currentSlide * slideWidth);
        slider.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        updateIndicators();
    }
}

function updateIndicators() {
    const dots = document.querySelectorAll('.gallery-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateGallerySlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateGallerySlider();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateGallerySlider();
}

function setupGallerySlider() {
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');
    const dots = document.querySelectorAll('.gallery-dot');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Auto-slide every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Update slides per view on window resize
    window.addEventListener('resize', () => {
        updateSlidesPerView();
        updateGallerySlider();
    });
    
    // Initial setup
    updateSlidesPerView();
    updateGallerySlider();
    
    // Setup modal functionality
    setupGalleryModal();
}

// Modal functionality
let modalCurrentSlide = 0;

function openModal(slideIndex) {
    modalCurrentSlide = slideIndex;
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    // Get the image source from the gallery
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const imageSrc = galleryItems[slideIndex].src;
    const imageAlt = galleryItems[slideIndex].alt;
    
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
    modalCaption.textContent = `Image ${slideIndex + 1} of ${totalSlides}`;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

function modalNextSlide() {
    modalCurrentSlide = (modalCurrentSlide + 1) % totalSlides;
    updateModalImage();
}

function modalPrevSlide() {
    modalCurrentSlide = (modalCurrentSlide - 1 + totalSlides) % totalSlides;
    updateModalImage();
}

function updateModalImage() {
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    const imageSrc = galleryItems[modalCurrentSlide].src;
    const imageAlt = galleryItems[modalCurrentSlide].alt;
    
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
    modalCaption.textContent = `Image ${modalCurrentSlide + 1} of ${totalSlides}`;
}

function setupGalleryModal() {
    const modal = document.getElementById('galleryModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Add click events to gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openModal(index));
    });
    
    // Close modal events
    modalOverlay.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);
    
    // Modal navigation
    modalPrev.addEventListener('click', modalPrevSlide);
    modalNext.addEventListener('click', modalNextSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                modalPrevSlide();
                break;
            case 'ArrowRight':
                modalNextSlide();
                break;
        }
    });
}

// Main initialization function
function initializeWebsite() {
    // Add smooth scrolling for any anchor links
    setupSmoothScrolling();
    
    // Add any interactive elements
    setupInteractiveElements();
    
    // Add scroll effects if needed
    setupScrollEffects();
    
    // Setup gallery slider
    setupGallerySlider();
}

// Smooth scrolling functionality
function setupSmoothScrolling() {
    // Get all anchor links that point to sections
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Setup interactive elements
function setupInteractiveElements() {
    // Add click event to the "View Details" button
    const viewDetailsBtn = document.querySelector('.btn-modern');
    if (viewDetailsBtn) {
        viewDetailsBtn.addEventListener('click', function() {
            // Add functionality for the button click
            console.log('View Details button clicked!');
            // You can add scroll to next section or open modal here
        });
    }
    
    // Add hover effects to hero title (if needed beyond CSS)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.addEventListener('mouseenter', function() {
            // Additional JavaScript hover effects can be added here
            console.log('Hero title hovered!');
        });
    }
}

// Scroll effects and animations
function setupScrollEffects() {
    // Add scroll-triggered animations if needed
    window.addEventListener('scroll', function() {
        // Add any scroll-based effects here
        // For example: parallax effects, fade-in animations, etc.
    });
}

// Utility functions that might be useful
function copyToClipboard(text) {
    // Function to copy text to clipboard (useful for bank details)
    navigator.clipboard.writeText(text).then(function() {
        console.log('Text copied to clipboard: ' + text);
        // You can add a toast notification here
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
    });
}

// Function to format dates
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

// Function to countdown to wedding date
function setupCountdown() {
    const weddingDate = new Date('2025-10-18T00:00:00');
    
    function updateCountdown() {
        const now = new Date();
        const timeLeft = weddingDate - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            // You can update a countdown element here
            console.log(`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds until the wedding!`);
        }
    }
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call
}

// Scroll to next section function
function scrollToNextSection() {
    const currentSection = event.target.closest('section');
    let nextElement = currentSection.nextElementSibling;
    
    // Skip non-section elements (like modals)
    while (nextElement && nextElement.tagName !== 'SECTION') {
        nextElement = nextElement.nextElementSibling;
    }
    
    if (nextElement && nextElement.tagName === 'SECTION') {
        nextElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Update active menu item
        const sectionId = nextElement.getAttribute('id');
        if (sectionId) {
            updateActiveMenuItem(sectionId);
        }
    }
}

// Scroll to specific section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Update active menu item
        updateActiveMenuItem(sectionId);
        
        // Ensure proper scroll-snap behavior
        setTimeout(() => {
            const scrollContainer = document.querySelector('.scroll-container');
            if (scrollContainer) {
                scrollContainer.scrollTop = section.offsetTop;
            }
        }, 100);
    }
}

// Open RSVP form function
function openRSVP() {
    window.open('https://forms.gle/Pi9SZ1azc9dqhJNL7', '_blank');
}

// Update active menu item
function updateActiveMenuItem(sectionId) {
    // Remove active class from all menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to current section's menu item
    const activeMenuItem = document.querySelector(`[onclick="scrollToSection('${sectionId}')"]`);
    if (activeMenuItem) {
        activeMenuItem.classList.add('active');
    }
}

// Update active menu item on scroll
function updateMenuOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollContainer = document.querySelector('.scroll-container');
    const scrollPosition = scrollContainer ? scrollContainer.scrollTop + 100 : window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            updateActiveMenuItem(sectionId);
        }
    });
}

// Add scroll event listeners
document.addEventListener('scroll', updateMenuOnScroll);

// Also listen to scroll container specifically
document.addEventListener('DOMContentLoaded', function() {
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
        scrollContainer.addEventListener('scroll', updateMenuOnScroll);
    }
});

// Copy account number function for gift section
function copyAccountNumber() {
    const accountNumber = document.getElementById('accountNumber').textContent;
    const button = event.target.closest('.btn-copy');
    
    // Copy to clipboard
    navigator.clipboard.writeText(accountNumber).then(function() {
        // Change button text temporarily to show success
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="bi bi-check"></i>';
        button.style.background = 'var(--secondary-color)';
        
        // Reset button after 2 seconds
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = 'var(--primary-color)';
        }, 2000);
        
        console.log('Account number copied to clipboard: ' + accountNumber);
    }).catch(function(err) {
        console.error('Could not copy account number: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = accountNumber;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        // Show success message even with fallback
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="bi bi-check"></i>';
        button.style.background = 'var(--secondary-color)';
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = 'var(--primary-color)';
        }, 2000);
    });
}



// Export functions for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeWebsite,
        setupSmoothScrolling,
        setupInteractiveElements,
        setupScrollEffects,
        copyToClipboard,
        formatDate,
        setupCountdown,
        copyAccountNumber,
        scrollToNextSection
    };
} 