// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBe2h3hH2dvxuM5Ps9MdmJEvxfp8Xq4vpI",
  authDomain: "super-box-web.firebaseapp.com",
  projectId: "super-box-web",
  storageBucket: "super-box-web.appspot.com",
  messagingSenderId: "972098791327",
  appId: "1:972098791327:web:5ec6c1880d89b31428ffaa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app)