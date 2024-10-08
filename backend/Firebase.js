const { initializeApp } = require("firebase/app");
const { getAuth, GoogleAuthProvider } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyBXkQe-oO60i5u9nWDyJF5sZz81V8hvqCU",
    authDomain: "ecommerce-4f72d.firebaseapp.com",
    projectId: "ecommerce-4f72d",
    storageBucket: "ecommerce-4f72d.appspot.com",
    messagingSenderId: "1028779836642",
    appId: "1:1028779836642:web:b134f2a4bdaf45d312cabb",
    measurementId: "G-T671RKR3K5"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

module.exports = { auth, provider, db };

