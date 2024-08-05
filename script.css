// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDynqpdLsdYKp3eqviwlM_3qjwVfXk1qQg",
    authDomain: "app-landing-page-125fe.firebaseapp.com",
    projectId: "app-landing-page-125fe",
    storageBucket: "app-landing-page-125fe.appspot.com",
    messagingSenderId: "1027675866074",
    appId: "1:1027675866074:web:ed9c9e9f37a1553620b6e3",
    measurementId: "G-3ZVWGFBNZB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

document.addEventListener('DOMContentLoaded', () => {
    const sendOTPButton = document.getElementById('sendOTP');
    const otpSection = document.getElementById('otpSection');

    // Initialize Recaptcha
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
            // reCAPTCHA solved, allow sendOTP
            console.log('reCAPTCHA solved');
        },
        'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            alert('reCAPTCHA expired. Please try again.');
        }
    });

    sendOTPButton.addEventListener('click', () => {
        const phoneNumber = document.getElementById('phone').value;
        const countryCode = document.getElementById('countryCode').value;
        const fullPhoneNumber = countryCode + phoneNumber;
        const appVerifier = window.recaptchaVerifier;

        firebase.auth().signInWithPhoneNumber(fullPhoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                otpSection.style.display = 'block';
                alert('OTP sent successfully');
            }).catch((error) => {
                console.error('Error during signInWithPhoneNumber', error);
                alert(`Error sending OTP: ${error.message}`);
            });
    });

    const signupForm = document.getElementById('signupForm');
    const signinForm = document.getElementById('signinForm');

    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const otp = document.getElementById('otp').value;
            window.confirmationResult.confirm(otp).then((result) => {
                const user = result.user;
                alert('Sign-up successful!');
                // Redirect to another page or perform other actions
            }).catch((error) => {
                console.error('Error verifying OTP', error);
                alert('Error verifying OTP. Please try again.');
            });
        });
    }

    if (signinForm) {
        signinForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const otp = document.getElementById('otp').value;
            window.confirmationResult.confirm(otp).then((result) => {
                const user = result.user;
                alert('Sign-in successful!');
                // Redirect to another page or perform other actions
            }).catch((error) => {
                console.error('Error verifying OTP', error);
                alert('Error verifying OTP. Please try again.');
            });
        });
    }
});
