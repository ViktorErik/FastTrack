/*
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, addDoc, getFirestore } from "firebase/firestore";
*/
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
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
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
    // ...
});
signOut(auth).then(() => {
    // Sign-out successful.
}).catch((error) => {
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
let exerciseIndex = 0;
var exercises = [];
const exerciseSets = {};
const nameLength = 50;
// Add global event listeners here
document.addEventListener("DOMContentLoaded", () => {
    var _a;
    (_a = document.getElementById("addExerciseButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", createNewExercise);
});
function createNewExercise() {
    var _a;
    if (exercises.length == 0 || ((_a = exercises[exercises.length - 1]) === null || _a === void 0 ? void 0 : _a.name)) {
        const exerciseBlueprint = document.getElementById("exerciseBlueprint");
        if (exerciseBlueprint) {
            const newExercise = new Exercise();
            exercises.push(newExercise);
            exerciseSets[newExercise.name] = [];
            const newExerciseDiv = exerciseBlueprint.cloneNode(true);
            if (newExerciseDiv instanceof HTMLElement)
                newExerciseDiv.id = exerciseIndex.toString();
            const exerciseContainer = document.getElementById("exerciseContainer");
            if (newExerciseDiv)
                exerciseContainer === null || exerciseContainer === void 0 ? void 0 : exerciseContainer.appendChild(newExerciseDiv);
            if (newExerciseDiv instanceof HTMLElement) {
                const nameInput = newExerciseDiv.querySelector("#nameInput");
                const muscleInput = newExerciseDiv.querySelector("#muscleInput");
                const exerciseButton = newExerciseDiv.querySelector("#exerciseButton");
                nameInput === null || nameInput === void 0 ? void 0 : nameInput.addEventListener("input", () => {
                    if (nameInput.value.length <= nameLength) {
                        updateExerciseData(+newExerciseDiv.id, nameInput.value, muscleInput === null || muscleInput === void 0 ? void 0 : muscleInput.value);
                        if (exerciseButton)
                            exerciseButton.textContent = nameInput.value;
                    }
                    else {
                        if (exerciseButton === null || exerciseButton === void 0 ? void 0 : exerciseButton.textContent)
                            nameInput.value = exerciseButton.textContent;
                    }
                });
                muscleInput === null || muscleInput === void 0 ? void 0 : muscleInput.addEventListener("input", () => {
                    if (muscleInput.value.length) {
                        updateExerciseData(+newExerciseDiv.id, nameInput === null || nameInput === void 0 ? void 0 : nameInput.value, muscleInput.value);
                    }
                });
                exerciseButton === null || exerciseButton === void 0 ? void 0 : exerciseButton.addEventListener("click", () => {
                    localStorage.clear();
                    localStorage.setItem("exercise", exercises[+newExerciseDiv.id].name);
                    window.location.href = "tracking.html";
                });
            }
            exerciseIndex++;
        }
    }
}
function updateExerciseData(exerciseIndex, name, muscles) {
    if (name) {
        exercises[exerciseIndex].setName(name);
    }
    if (muscles) {
        exercises[exerciseIndex].setMuscles(muscles);
    }
}
//# sourceMappingURL=index.js.map