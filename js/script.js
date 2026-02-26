// Kamla Nehru Public School - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            
            // Change icon
            const icon = mobileMenuBtn.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Admission Form Handling
    const admissionForm = document.getElementById('admissionForm');
    
    if (admissionForm) {
        admissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const classSelected = document.getElementById('class').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !phone || !email || !classSelected) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Create enquiry object
            const enquiry = {
                id: Date.now(),
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                name: name,
                phone: phone,
                email: email,
                class: classSelected,
                message: message,
                status: 'new'
            };
            
            // Get existing enquiries from localStorage
            let enquiries = JSON.parse(localStorage.getItem('admissionEnquiries')) || [];
            
            // Add new enquiry
            enquiries.push(enquiry);
            
            // Save to localStorage
            localStorage.setItem('admissionEnquiries', JSON.stringify(enquiries));
            
            // Show success message
            alert('Thank you for your enquiry! We will contact you soon.');
            
            // Reset form
            admissionForm.reset();
            
            // Log for debugging
            console.log('Enquiry saved:', enquiry);
        });
    }
    
    // Admin: View Enquiries (Access via admin.html or console)
    window.getEnquiries = function() {
        const enquiries = JSON.parse(localStorage.getItem('admissionEnquiries')) || [];
        return enquiries;
    };
    
    // Admin: Delete enquiry
    window.deleteEnquiry = function(id) {
        let enquiries = JSON.parse(localStorage.getItem('admissionEnquiries')) || [];
        enquiries = enquiries.filter(e => e.id !== id);
        localStorage.setItem('admissionEnquiries', JSON.stringify(enquiries));
        console.log('Enquiry deleted:', id);
    };
    
    // Admin: Clear all enquiries
    window.clearEnquiries = function() {
        localStorage.removeItem('admissionEnquiries');
        console.log('All enquiries cleared');
    };
    
    // Set current year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Navbar background change on scroll
    const siteHeader = document.querySelector('.site-header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            siteHeader.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            siteHeader.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Gallery lightbox effect (simple version)
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                // Could implement lightbox here
                console.log('Gallery image clicked:', img.src);
            }
        });
    });
    
    // Animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.facility-card, .gallery-item, .contact-item');
        
        elements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.animationDelay = `${index * 0.1}s`;
                element.classList.add('fade-in');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
    
    console.log('Kamla Nehru Public School website loaded successfully!');
});
