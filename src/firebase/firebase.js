import app from 'firebase/app';
import auth from 'firebase/auth';

import firebaseConfig from './config';



class Firebase {
    constructor() {
        // Initialize Firebase
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
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
}

// Instatiate Our Firebase class
const firebase = new Firebase();
export default firebase;