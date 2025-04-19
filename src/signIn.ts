


const auth = window.firebase.getAuth();
const GoogleAuthProvider = window.firebase.GoogleAuthProvider;
const signInWithPopup = window.firebase.signInWithPopup;
const signOut = window.firebase.signOut;
const onAuthStateChanged = window.firebase.onAuthStateChanged;

export let curUser = auth.currentUser;

auth.languageCode = auth.useDeviceLanguage();

const provider = new GoogleAuthProvider();


function _signIn() {

    
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

        if (errorCode == "auth/popup-closed-by-user") {
            _signIn();
        }

        // ...
    });
}


export async function signInUser(): Promise<any> {
   
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user: any) => {
            if (!user) {
                _signIn();
            }
            else {
                curUser = user;
                resolve(curUser);
            }
        });
    });
}




export function signOutUser() {
    
    signOut(auth).then(() => {
        // Sign-out successful.
        curUser = null;
        console.log("UTLOGGAD");
    }).catch((error: any) => {
        // An error happened.
    });
}