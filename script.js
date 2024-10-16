// Your web app's Firebase configuration
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPeBq2k72v2-V4U3tXPOU8MYzJMXEaqrY",
  authDomain: "signup-9cb1a.firebaseapp.com",
  projectId: "signup-9cb1a",
  storageBucket: "signup-9cb1a.appspot.com",
  messagingSenderId: "489818758716",
  appId: "1:489818758716:web:5e8c5f33a5920c52b2ad39",
  measurementId: "G-VW283680SD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
