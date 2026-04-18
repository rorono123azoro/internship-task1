document.addEventListener('DOMContentLoaded', () => {
    /* --- Navbar Scroll Effect --- */
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
            navbar.classList.replace('py-4', 'py-2'); // Tailwind padding adjustment if needed, handled via flex height implicitly
        } else {
            navbar.classList.remove('shadow-lg');
        }
    });

    /* --- Scroll Animation (Intersection Observer) --- */
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    /* --- Form Validation --- */
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = document.getElementById('submitBtn');

    // Email regex roughly matching HTML5 email validation
    const isValidEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const resetErrors = () => {
        nameError.classList.add('hidden');
        nameInput.classList.remove('border-red-500');
        nameInput.classList.add('border-gray-700');

        emailError.classList.add('hidden');
        emailInput.classList.remove('border-red-500');
        emailInput.classList.add('border-gray-700');

        messageError.classList.add('hidden');
        messageInput.classList.remove('border-red-500');
        messageInput.classList.add('border-gray-700');
    };

    const showError = (inputElement, errorElement) => {
        errorElement.classList.remove('hidden');
        inputElement.classList.remove('border-gray-700');
        inputElement.classList.add('border-red-500');
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual submission for demo
        
        let isValid = true;
        resetErrors();
        successMessage.classList.add('hidden');

        // Name Validation
        if (!nameInput.value.trim()) {
            showError(nameInput, nameError);
            isValid = false;
        }

        // Email Validation
        if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
            showError(emailInput, emailError);
            isValid = false;
        }

        // Message Validation
        if (!messageInput.value.trim()) {
            showError(messageInput, messageError);
            isValid = false;
        }

        // Success Simulation
        if (isValid) {
            // Change button state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="relative z-10 hidden md:inline">Sending...</span><div class="spinner border-t-2 border-white border-solid rounded-full w-5 h-5 animate-spin mx-auto md:hidden"></div>';
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-75', 'cursor-not-allowed');

            // Simulate network request
            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
                successMessage.classList.remove('hidden');
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                }, 5000);
            }, 1500);
        }
    });

    // Real-time validation on blur
    nameInput.addEventListener('blur', () => {
        if (!nameInput.value.trim()) {
            showError(nameInput, nameError);
        } else {
            nameError.classList.add('hidden');
            nameInput.classList.remove('border-red-500');
            nameInput.classList.add('border-gray-700');
        }
    });

    emailInput.addEventListener('blur', () => {
        if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
            showError(emailInput, emailError);
        } else {
            emailError.classList.add('hidden');
            emailInput.classList.remove('border-red-500');
            emailInput.classList.add('border-gray-700');
        }
    });

    messageInput.addEventListener('blur', () => {
        if (!messageInput.value.trim()) {
            showError(messageInput, messageError);
        } else {
            messageError.classList.add('hidden');
            messageInput.classList.remove('border-red-500');
            messageInput.classList.add('border-gray-700');
        }
    });
});
