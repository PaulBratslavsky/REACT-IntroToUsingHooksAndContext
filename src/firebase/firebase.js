import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'; 

import firebaseConfig from './config';



class Firebase {
    constructor() {
        // Initialize Firebase
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.database = app.firestore();
    }

    // Create User Method
    async register(name, email, password) {
        console.log("Create User Called");
        const newUser = await this.auth.createUserWithEmailAndPassword(email, password);
        
        // Save Name To Profilr
        return await newUser.user.updateProfile({
            displayName: name
        });
    }

    // Login User Method
    async login(email, password) {
        console.log("Login User Called");
        return await this.auth.signInWithEmailAndPassword(email, password);
    }

    // Logout User Method
    async logout() {
        await this.auth.signOut();
    }

    // Reset User Password Method
    async resetPassword(email) {
        await this.auth.sendPasswordResetEmail(email);
    }
}

// Instatiate Our Firebase class
const firebase = new Firebase();
export default firebase;