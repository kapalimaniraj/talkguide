import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDhJ_PP07D2v-SmKo3mN4F4ybvrziCk7mM",
  authDomain: "talkguide.firebaseapp.com",
  projectId: "talkguide",
  storageBucket: "talkguide.firebasestorage.app",
  messagingSenderId: "285941629339",
  appId: "1:285941629339:web:da81db468c5ee68f84a13e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');
const userName = document.getElementById('userName');

signInBtn.addEventListener('click', () => {
  signInWithPopup(auth, provider).catch(err => {
    console.error(err);
    alert('Sign-in failed: ' + err.code);
  });
});
signOutBtn.addEventListener('click', () => signOut(auth));

onAuthStateChanged(auth, user => {
  signInBtn.hidden = !!user;
  signOutBtn.hidden = !user;
  userName.textContent = user ? (user.displayName || user.email) : '';
});