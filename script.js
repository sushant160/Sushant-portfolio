// Mobile menu toggle
document.querySelector('.mobile-menu').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu after clicking a link
            document.querySelector('.nav-links').classList.remove('active');
        }
    });
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = darkModeToggle.querySelector('i');

darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        darkModeIcon.classList.remove('fa-sun');
        darkModeIcon.classList.add('fa-moon');
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeIcon.classList.remove('fa-moon');
    darkModeIcon.classList.add('fa-sun');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// ========== EMAILJS INTEGRATION ==========
console.log("✅ Script.js loaded successfully!");

// Initialize EmailJS
(function() {
    emailjs.init("tBHf99-gKLPzqqAog");
})();

// Contact form submission handler
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    console.log("🎯 Form submitted!");
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Send email using EmailJS
    emailjs.sendForm(
        'service_3b1w17n',
        'template_pm38sl7', 
        this
    )
    .then(function(response) {
        console.log("✅ Email sent successfully!", response);
        alert('✅ Message sent successfully! I will get back to you soon.');
        document.getElementById('contact-form').reset();
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        submitBtn.disabled = false;
    }, function(error) {
        console.log("❌ Email failed!", error);
        alert('❌ Failed to send message. Please email me directly at shushantkumar160@gmail.com');
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        submitBtn.disabled = false;
    });
});

// Projects Slider - SINGLE VERSION
document.addEventListener('DOMContentLoaded', function() {
    const projects = document.querySelectorAll('.uber-style-project');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const projectCounter = document.querySelector('.project-counter');
    
    let currentIndex = 0;
    const totalProjects = projects.length;
    
    function showProject(index) {
        projects.forEach(project => project.classList.remove('active'));
        projects[index].classList.add('active');
        currentIndex = index;
        projectCounter.textContent = `${currentIndex + 1}/${totalProjects}`;
    }
    
    nextArrow.addEventListener('click', function() {
        let nextIndex = (currentIndex + 1) % totalProjects;
        showProject(nextIndex);
    });
    
    prevArrow.addEventListener('click', function() {
        let prevIndex = (currentIndex - 1 + totalProjects) % totalProjects;
        showProject(prevIndex);
    });
    
    showProject(0);
});
