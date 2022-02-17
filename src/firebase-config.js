
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDzC1ATHKYkHmg1cWtrV96p7xLAOyuPbjI",
    authDomain: "dhd-lms-phone-auth.firebaseapp.com",
    projectId: "dhd-lms-phone-auth",
    storageBucket: "dhd-lms-phone-auth.appspot.com",
    messagingSenderId: "98554134243",
    appId: "1:98554134243:web:f47200756c7b02c3698fd6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
