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
    
    // Debug: Check form data
    const formData = new FormData(this);
    console.log("📝 Form Data:");
    for (let [key, value] of formData.entries()) {
        console.log(key + ": " + value);
    }
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Send email using EmailJS
    emailjs.sendForm(
        'service_3b1w17n',      // Your Service ID
        'template_pm38sl7',     // Your Template ID
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

// Professional Projects Slider - WITH AUTO-SLIDE REMOVED
document.addEventListener('DOMContentLoaded', function() {
    const projectsSlider = document.querySelector('.projects-slider');
    const projectCards = document.querySelectorAll('.detailed-project');
    const prevArrow = document.querySelector('.project-arrow-left');
    const nextArrow = document.querySelector('.project-arrow-right');
    
    if (projectsSlider && projectCards.length > 0) {
        let currentIndex = 0;
        const totalProjects = projectCards.length;
        
        // Next project
        nextArrow.addEventListener('click', function() {
            if (currentIndex < totalProjects - 1) {
                currentIndex++;
                updateSlider();
            }
        });
        
        // Previous project
        prevArrow.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
        
        function updateSlider() {
            projectsSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update arrow states
            prevArrow.disabled = currentIndex === 0;
            nextArrow.disabled = currentIndex === totalProjects - 1;
            
            // Update active states
            projectCards.forEach((card, index) => {
                card.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Initial state
        updateSlider();
        
        // ❌ AUTO-SLIDE REMOVED - Yeh line comment kardi
        // setInterval(function() {
        //     if (currentIndex < totalProjects - 1) {
        //         currentIndex++;
        //     } else {
        //         currentIndex = 0;
        //     }
        //     updateSlider();
        // }, 7000);
    }
});

// Uber-style Projects Slider with Image Space - WITH AUTO-SLIDE REMOVED
document.addEventListener('DOMContentLoaded', function() {
    const projects = document.querySelectorAll('.uber-style-project');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const projectCounter = document.querySelector('.project-counter');
    
    let currentIndex = 0;
    const totalProjects = projects.length;
    
    // Show first project, hide others
    projects.forEach((project, index) => {
        if (index !== 0) {
            project.style.display = 'none';
        }
    });
    
    // Update counter
    function updateCounter() {
        projectCounter.textContent = `${currentIndex + 1}/${totalProjects}`;
    }
    
    // Show project with animation
    function showProject(index) {
        // Hide current project with fade out
        projects[currentIndex].style.display = 'none';
        
        // Show new project with fade in
        projects[index].classList.remove('active');
        void projects[index].offsetWidth; // Trigger reflow
        projects[index].style.display = 'block';
        projects[index].classList.add('active');
        
        currentIndex = index;
        updateCounter();
    }
    
    // Next project
    nextArrow.addEventListener('click', function() {
        let nextIndex = (currentIndex + 1) % totalProjects;
        showProject(nextIndex);
    });
    
    // Previous project
    prevArrow.addEventListener('click', function() {
        let prevIndex = (currentIndex - 1 + totalProjects) % totalProjects;
        showProject(prevIndex);
    });
    
    // ❌ AUTO-SLIDE REMOVED - Yeh line comment kardi
    // setInterval(function() {
    //     let nextIndex = (currentIndex + 1) % totalProjects;
    //     showProject(nextIndex);
    // }, 8000);
    
    // Initial counter update
    updateCounter();
});
// Uber-style Projects Slider - CORRECTED VERSION
document.addEventListener('DOMContentLoaded', function() {
    const projects = document.querySelectorAll('.uber-style-project');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const projectCounter = document.querySelector('.project-counter');
    
    let currentIndex = 0;
    const totalProjects = projects.length;
    
    // Pehle sab projects ko hide karo, sirf first show karo
    projects.forEach((project, index) => {
        if (index === 0) {
            project.classList.add('active');
        } else {
            project.classList.remove('active');
        }
    });
    
    // Update counter
    function updateCounter() {
        projectCounter.textContent = `${currentIndex + 1}/${totalProjects}`;
    }
    
    // Show project
    function showProject(index) {
        // Sab projects hide karo
        projects.forEach(project => {
            project.classList.remove('active');
        });
        
        // Sirf selected project show karo
        projects[index].classList.add('active');
        currentIndex = index;
        updateCounter();
    }
    
    // Next project
    nextArrow.addEventListener('click', function() {
        let nextIndex = (currentIndex + 1) % totalProjects;
        showProject(nextIndex);
    });
    
    // Previous project
    prevArrow.addEventListener('click', function() {
        let prevIndex = (currentIndex - 1 + totalProjects) % totalProjects;
        showProject(prevIndex);
    });
    
    // Initial counter update
    updateCounter();
});