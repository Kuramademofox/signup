  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCQZVjMXCZ08lbOowSJrdqKx8kCZtXnmu0",
    authDomain: "sign-in-4fe48.firebaseapp.com",
    projectId: "sign-in-4fe48",
    storageBucket: "sign-in-4fe48.appspot.com",
    messagingSenderId: "209201210883",
    appId: "1:209201210883:web:4bfe1ea93c0d9426565036",
    measurementId: "G-KK3Y6Z7PG1"
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
