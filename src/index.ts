

import { signInUser, curUser, signOutUser } from "./signIn.js";
import { addDoc, collection, db, doc, setDoc } from "./databaseHandler.js"
import { Exercise } from "./Exercise.js";



await signInUser();
await setDoc(doc(db, "users", curUser.uid), {}); // Register userID, doesn't cause duplicates

document.getElementById("signOutButton")?.addEventListener("click", signOutUser);

console.log(curUser);
document.getElementById("addExerciseButton")?.addEventListener("click", initializeExercise);

    /*
    if (!sessionStorage.getItem("logged in")) {
        localStorage.setItem("logged in", "true");
        location.reload();
    }
}
*/


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
           
               
let exerciseIndex: number = 0;
var exercises: Exercise[] = []; 
const exerciseSets: any = {};
const nameLength: number = 50;

function loadExercises(exercises: Exercise[]) {
    for (const exercise of exercises) {
        displayExercise(exercise);
    }
}

async function initializeExercise() {
    
    /*
    await setDoc(doc(db, "users", "Jonas"), {
        name: "JONAS",
        ålder: 3123
    });
    await addDoc(collection(db, "users"), {
        name: "JONAS",
        ålder: 3123
    });
    */
    
    const newExercise: Exercise = new Exercise();
    displayExercise(newExercise);
}

function displayExercise(exercise: Exercise): void {

        
    const exerciseBlueprint: HTMLElement | null = document.getElementById("exerciseBlueprint");
    if (exerciseBlueprint) {
        exercises.push(exercise);
        
        const newExerciseDiv: Node | null = exerciseBlueprint.cloneNode(true);
        if (newExerciseDiv instanceof HTMLElement) newExerciseDiv.id = exerciseIndex.toString();
        
        const exerciseContainer: HTMLElement | null = document.getElementById("exerciseContainer");
        if (newExerciseDiv) exerciseContainer?.appendChild(newExerciseDiv);
        
        if (newExerciseDiv instanceof HTMLElement) {
            const nameInput: HTMLInputElement | null = newExerciseDiv.querySelector("#nameInput");
            const muscleInput: HTMLInputElement | null = newExerciseDiv.querySelector("#muscleInput");
            const exerciseButton: HTMLButtonElement | null = newExerciseDiv.querySelector("#exerciseButton");
            
            if (nameInput) nameInput.value = exercise.name;
            if (muscleInput) muscleInput.value = exercise.muscles;

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

function updateExerciseData(exerciseIndex: number, name: string | undefined, muscles: string | undefined) {
    if (name) {
        exercises[exerciseIndex].setName(name);
    } 
    if (muscles) {
        exercises[exerciseIndex].setMuscles(muscles);
    }
}
