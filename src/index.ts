
import { Exercise } from "./Exercise.js";




/*
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, addDoc, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9G6Aky0LRTMj6rnpQFFCVeZfw5SA4SlM",
  authDomain: "fasttrack-69875.firebaseapp.com",
  projectId: "fasttrack-69875",
  storageBucket: "fasttrack-69875.firebasestorage.app",
  messagingSenderId: "14126042112",
  appId: "1:14126042112:web:35d898ba9a64ab0e1d5ce5",
  measurementId: "G-Q06R30V83M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
  */





// Load in exercise data n shi like that here prolly

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