document.addEventListener('DOMContentLoaded', () => {

    // --- Element Selection ---
    const loginPage = document.getElementById('login-page');
    const appDashboard = document.getElementById('app-dashboard');
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    
    const sosButton = document.getElementById('sos-button');
    const sirenSound = document.getElementById('siren-sound');
    let isSirenPlaying = false;

    // --- Login Form Validation & Submission ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual form submission
        
        // Reset previous errors
        emailError.textContent = '';
        passwordError.textContent = '';
        let isValid = true;

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value || !emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        // Simple password validation (at least 6 characters)
        if (!passwordInput.value || passwordInput.value.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters long.';
            isValid = false;
        }

        // If form is valid, "log in"
        if (isValid) {
            console.log('Login successful!');
            // Hide login page and show the dashboard
            loginPage.classList.add('hidden');
            appDashboard.classList.remove('hidden');
            // Adjust body styles for the dashboard view
            document.body.style.alignItems = 'flex-start';
        }
    });

    // --- SOS Siren Button Functionality ---
    sosButton.addEventListener('click', () => {
        if (isSirenPlaying) {
            sirenSound.pause();
            sirenSound.currentTime = 0; // Rewind to the start
            sosButton.style.animation = 'pulse 2s infinite'; // Resume animation
            console.log('Siren stopped.');
        } else {
            sirenSound.play()
                .then(() => {
                    sosButton.style.animation = 'none'; // Stop pulsing when active
                    console.log('Siren playing...');
                })
                .catch(error => {
                    console.error("Error playing sound:", error);
                    alert("Could not play the siren sound. Please ensure you have a 'siren.mp3' file in the same directory and check browser permissions.");
                });
        }
        isSirenPlaying = !isSirenPlaying; // Toggle the state
    });

});