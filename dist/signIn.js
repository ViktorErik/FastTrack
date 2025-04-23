// import { getRedirectResult, signInWithRedirect } from "./databaseHandler";
export const auth = window.firebase.getAuth();
export const GoogleAuthProvider = window.firebase.GoogleAuthProvider;
const signInWithPopup = window.firebase.signInWithPopup;
const signInWithRedirect = window.firebase.signInWithRedirect;
export const getRedirectResult = window.firebase.getRedirectResult;
const signOut = window.firebase.signOut;
export const onAuthStateChanged = window.firebase.onAuthStateChanged;
export let curUser = auth.currentUser;
auth.languageCode = auth.useDeviceLanguage();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account" // So that you can choose account
});
async function _signIn(resolve) {
    /*
    signInWithRedirect(auth, provider);
    */
    signInWithPopup(auth, provider)
        .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        curUser = user;
        resolve();
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        /*
        if (errorCode == "auth/popup-closed-by-user") {
            _signIn(resolve);
        }
        */
        // ...
    });
}
/*
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
*/
export async function signInUser() {
    return new Promise((resolve) => {
        if (!curUser) {
            _signIn(resolve);
        }
        else {
            resolve(curUser);
        }
    });
}
export async function signOutUser() {
    return new Promise((resolve) => {
        signOut(auth).then(() => {
            // Sign-out successful.
            curUser = null;
            resolve();
        }).catch((error) => {
            // An error happened.
        });
    });
}
//# sourceMappingURL=signIn.js.map