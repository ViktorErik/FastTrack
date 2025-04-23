
export {};
declare global {
    interface Window {
        firebase: {
            
            app: any;
            db: any;
            collection: any;
            addDoc: any;
            initializeApp: any;
            getFirestore: any;
            setDoc: any;
            doc: any; 
            getDoc: any;
            getDocs: any;
            deleteDoc: any;

            GoogleAuthProvider: any;
            getAuth: any;
            signInWithPopup: any;
            signOut: any;
            signInWithRedirect: any;
            getRedirectResult: any;
            onAuthStateChanged: any;
        };
    }
}