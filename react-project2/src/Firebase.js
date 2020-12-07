// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import fb from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBBT0gNDI50cyWffPVRT3G0aSg7yOT7NTU",
    authDomain: "react-project2-f07b1.firebaseapp.com",
    databaseURL: "https://react-project2-f07b1.firebaseio.com",
    projectId: "react-project2-f07b1",
    storageBucket: "react-project2-f07b1.appspot.com",
    messagingSenderId: "777005753718",
    appId: "1:777005753718:web:cc7b02ab42e39df1d58657",
    measurementId: "G-YDNBPWZK4N"
};
fb.initializeApp(firebaseConfig); //allow using firebase inside
export const firestore = fb.firestore(); //Database
export const auth = fb.auth();//firebase auth allow people sign in 
export const provider = new fb.auth.GoogleAuthProvider();
export default fb;