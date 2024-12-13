// import { initializeApp } from "firebase/app";
// import { getAuth,GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyBXkQe-oO60i5u9nWDyJF5sZz81V8hvqCU",
//   authDomain: "ecommerce-4f72d.firebaseapp.com",
//   projectId: "ecommerce-4f72d",
//   storageBucket: "ecommerce-4f72d.appspot.com",
//   messagingSenderId: "1028779836642",
//   appId: "1:1028779836642:web:b134f2a4bdaf45d312cabb",
//   measurementId: "G-T671RKR3K5"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app)
// const provider = new GoogleAuthProvider();
// const db = getFirestore(app);

// export {auth,provider,db}

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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

export { auth, provider, db };
