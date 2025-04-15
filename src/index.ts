

/*
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, addDoc, getFirestore } from "firebase/firestore";
*/

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
        };
    }
}

const db = window.firebase.db;
const app = window.firebase.app;

const auth = window.firebase.getAuth();
const GoogleAuthProvider = window.firebase.GoogleAuthProvider;
const signInWithPopup = window.firebase.signInWithPopup;
const signInWithRedirect = window.firebase.signInWithRedirect;
const getRedirectResult = window.firebase.getRedirectResult;
const signOut = window.firebase.signOut;

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


signInWithRedirect(auth, provider);

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

signOut(auth).then(() => {
    // Sign-out successful.
    }).catch((error: any) => {
    // An error happened.
    });

    /*
    try {
    const docRef = await window.firebase.addDoc(window.firebase.collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
        
        });
        console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
            }
            */
           
import { Exercise } from "./Exercise.js";

let exerciseIndex: number = 0;
var exercises: Exercise[] = []; 
const exerciseSets: any = {};
const nameLength: number = 50;

// Add global event listeners here
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("addExerciseButton")?.addEventListener("click", createNewExercise);
});


function createNewExercise(): void {
    
    if (exercises.length == 0 || exercises[exercises.length-1]?.name) {
        
        
        const exerciseBlueprint: HTMLElement | null = document.getElementById("exerciseBlueprint");
        if (exerciseBlueprint) {
            const newExercise: Exercise = new Exercise();
            exercises.push(newExercise);
            exerciseSets[newExercise.name] = [];
            
            const newExerciseDiv: Node | null = exerciseBlueprint.cloneNode(true);
            if (newExerciseDiv instanceof HTMLElement) newExerciseDiv.id = exerciseIndex.toString();
            
            const exerciseContainer: HTMLElement | null = document.getElementById("exerciseContainer");
            if (newExerciseDiv) exerciseContainer?.appendChild(newExerciseDiv);

            if (newExerciseDiv instanceof HTMLElement) {
                const nameInput: HTMLInputElement | null = newExerciseDiv.querySelector("#nameInput");
                const muscleInput: HTMLInputElement | null = newExerciseDiv.querySelector("#muscleInput");
                const exerciseButton: HTMLButtonElement | null = newExerciseDiv.querySelector("#exerciseButton");

                nameInput?.addEventListener("input", () => {
                    if (nameInput.value.length <= nameLength) {
                        updateExerciseData(+newExerciseDiv.id, nameInput.value, muscleInput?.value);
                        if (exerciseButton) exerciseButton.textContent = nameInput.value;
                    }
                    else {
                        if (exerciseButton?.textContent) nameInput.value = exerciseButton.textContent
                    }
                });

                muscleInput?.addEventListener("input", () => {
                    if (muscleInput.value.length) {
                        updateExerciseData(+newExerciseDiv.id, nameInput?.value, muscleInput.value);
                    }
                });

                exerciseButton?.addEventListener("click", () => { 
                    localStorage.clear()
                    localStorage.setItem("exercise", exercises[+newExerciseDiv.id].name);
                    window.location.href = "tracking.html"
                });
            }

            exerciseIndex++;
        }
    }
    
   
}

function updateExerciseData(exerciseIndex: number, name: string | undefined, muscles: string | undefined) {
    if (name) {
        exercises[exerciseIndex].setName(name);
    } 
    if (muscles) {
        exercises[exerciseIndex].setMuscles(muscles);
    }
}