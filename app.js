// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import {
    getFirestore,
    collection, 
    addDoc 
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { 
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCWWSWx-0i3APLa6uVagGtvtnmVe9hCCnw",
    authDomain: "singin-732f2.firebaseapp.com",
    projectId: "singin-732f2",
    storageBucket: "singin-732f2.appspot.com",
    messagingSenderId: "719826244834",
    appId: "1:719826244834:web:0a61cfe5d8a02e8ee53abb",
    measurementId: "G-H90TZWV5B8"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const signUpButton = document.getElementById('signUp');
const sign_UpButton = document.getElementById('sign_Up');
const signInButton = document.getElementById('signIn');
const sign_InButton = document.getElementById('sign_In');
const container = document.getElementById('container');
const userEmail = document.getElementById('userEmail');
const userPassword = document.getElementById('userPassword');
const createdEmail = document.getElementById('createEmail');
const createdPassword = document.getElementById('createPassword');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const age = document.getElementById('age');
const profileImage = document.getElementById('profile');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in");
        const uid = user.uid;
    } else {
        console.log("User is not logged in");
    }
});

sign_InButton.addEventListener('click', () => {
    const email = userEmail.value;
    const password = userPassword.value;

    console.log(email);
    console.log(password);
    
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // alert("User successfully logged in with " + email);
			location.href ='../My Portfolio/index.html'
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
});


sign_UpButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");

    const email = createdEmail.value;
    const password = createdPassword.value;

    console.log(email);
	console.log(password);
	
    const signup = (email, password, file) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            console.log("User created:", user);
            alert("User successfully created with " + email);

            const imageRef = await ref(storage, `user/${user.uid}`);
            const url = await uploadImage(imageRef, file);
            console.log('url', url);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage);
                    });
                    };
                    signup(email, password, profileImage.files[0]);
    });

const uploadImage = async (imgRef, file) => {

        try {
            await uploadBytes(imgRef, file)
            const url = await getDownloadURL(imgRef)
            console.log(url);
            return url;
            
        } catch (error) {
            console.log(error)
            
        }
    }    
            
sign_UpButton.addEventListener('click', info);

async function info(){
	try {
		let personalData = collection(db , 'personalData')
		const docRef = await addDoc(personalData,{
			firstName: firstName.value,
			lastName: lastName.value,
			age: age.value,
            email: createdEmail.value,
            password: createdPassword.value,
            profileImage: profileImage.value
		})
		console.log("docRef ==>",docRef);
	console.log("Document written with ID: ", docRef.id);
  } catch (e) {
	console.error("Error adding document: ", e);
  }
  
}

