



declare global {
    interface Window {
        firebase: {
            app: any;
            db: any;
            collection: any;
            addDoc: any;
            GoogleAuthProvider: any;
            getAuth: any;
            signInWithPopup: any;
            signInWithRedirect: any;
            getRedirectResult: any;
            signOut: any;
            browserSessionPersistence: any;
            setPersistence: any;
            onAuthStateChanged: any;
        };
    }
}

export const db = window.firebase.db;
const app = window.firebase.app;

const auth = window.firebase.getAuth();
const GoogleAuthProvider = window.firebase.GoogleAuthProvider;
const signInWithPopup = window.firebase.signInWithPopup;
const signInWithRedirect = window.firebase.signInWithRedirect;
const getRedirectResult = window.firebase.getRedirectResult;
const signOut = window.firebase.signOut;
const browserSessionPersistence = window.firebase.browserSessionPersistence;
const setPersistence = window.firebase.setPersistence;
const onAuthStateChanged = window.firebase.onAuthStateChanged;

const user = auth.currentUser;

auth.languageCode = auth.useDeviceLanguage();

const provider = new GoogleAuthProvider();
/*
signInWithPopup(auth, provider)
.then((result: { user: any; }) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
}).catch((error: { code: any; message: any; customData: { email: any; }; }) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    });
    */

export function signInCheck(): void {

    onAuthStateChanged(auth, (user: any) => {
        if (!user) {
            signIn();
        }
    });
}
   
function signIn(): void {
    
    setPersistence(auth, browserSessionPersistence)
    .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return signInWithRedirect(auth, provider);

    })
    .catch((error: { code: any; message: any; }) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
    });

    getRedirectResult(auth)
    .then((result: { user: any; }) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error: { code: any; message: any; customData: { email: any; }; }) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
    
}





/*
signOut(auth).then(() => {
    // Sign-out successful.
    console.log("UTLOGGAD");
}).catch((error: any) => {
    // An error happened.
    });
*/