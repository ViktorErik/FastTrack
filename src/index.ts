

import { signInUser, curUser, signOutUser } from "./signIn.js";
import { addDoc, collection, db, doc, setDoc, getDoc, getDocs } from "./databaseHandler.js"
import { Exercise } from "./Exercise.js";


await signInUser();

document.getElementById("signOutButton")?.addEventListener("click", initNewUser);


document.getElementById("addExerciseButton")?.addEventListener("click", initializeExercise);

           
           
let exerciseIndex: number = 0;
var exercises: Exercise[] = []; 
const exerciseSets: any = {};
const maxInputLength: number = 50;
initializeUserExercises();

function initNewUser(): void {
    signOutUser();
    initializeUserExercises();
}

async function initializeUserExercises() {

    // TODO: Read in exercises
    
    const userExercises = await getDocs(collection(db, "users", curUser.uid, "exercises"));
    userExercises.forEach((exercise: any) => {
        const exerciseData = exercise.data();
        console.log(exerciseData);
        exercises.push(new Exercise(exerciseData["name"], exerciseData["muscles"], exerciseData["id"]));
    });
    

displayAllExercises(exercises);

}

function displayAllExercises(exercises: Exercise[]): void {
    for (const exercise of exercises) {
        displayExercise(exercise);
    }
}

async function initializeExercise() {
    
    const docRef = await addDoc(collection(db, "users", curUser.uid, "exercises"), {
    });
    const newExercise: Exercise = new Exercise();
    newExercise.setId(docRef.id);
    exercises.push(newExercise);
    writeExerciseToDatabase(newExercise);
    displayExercise(newExercise);
}


async function writeExerciseToDatabase(exercise: Exercise) {
    
    console.log(exercise);
    await setDoc(doc(db, "users", curUser.uid, "exercises", exercise.id), {
        name: exercise.name,
        muscles: exercise.muscles,
        id: exercise.id
    });
    
}


function displayExercise(exercise: Exercise): void {

        
    const exerciseBlueprint: HTMLElement | null = document.getElementById("exerciseBlueprint");
    if (exerciseBlueprint) {
        
        const newExerciseDiv: Node | null = exerciseBlueprint.cloneNode(true);
        // if (newExerciseDiv instanceof HTMLElement) newExerciseDiv.id = exerciseIndex.toString();
        
        const exerciseContainer: HTMLElement | null = document.getElementById("exerciseContainer");
        if (newExerciseDiv) exerciseContainer?.appendChild(newExerciseDiv);
        
        if (newExerciseDiv instanceof HTMLElement) {
            const nameInput: HTMLInputElement | null = newExerciseDiv.querySelector("#nameInput");
            const muscleInput: HTMLInputElement | null = newExerciseDiv.querySelector("#muscleInput");
            const exerciseButton: HTMLButtonElement | null = newExerciseDiv.querySelector("#exerciseButton");
            
            if (nameInput) nameInput.value = exercise.name;
            if (muscleInput) muscleInput.value = exercise.muscles;
            if (exerciseButton) exerciseButton.textContent = exercise.name;

            nameInput?.addEventListener("input", () => {
                if (nameInput.value.length <= maxInputLength) {
                    updateExerciseData(exercise, nameInput.value, muscleInput?.value);
                    if (exerciseButton) exerciseButton.textContent = nameInput.value;
    
                }
                else {
                    if (exerciseButton?.textContent) nameInput.value = exerciseButton.textContent
                }
            });

            muscleInput?.addEventListener("input", () => {
                if (muscleInput.value.length <= maxInputLength) {
                    // updateExerciseData(+newExerciseDiv.id, nameInput?.value, muscleInput.value);
                    updateExerciseData(exercise, nameInput?.value, muscleInput?.value);
                    
                }
            });
            
            exerciseButton?.addEventListener("click", () => { 
                localStorage.clear()
                localStorage.setItem("exercise", exercises[+newExerciseDiv.id].name);
                window.location.href = "tracking.html";
            });
        }

        exerciseIndex++;
    }
    
    
}

function updateExerciseData(exercise: Exercise, name?: string, muscles?: string) {

    if (name) {
        exercise.setName(name);
    } 
    if (muscles) {
        exercise.setMuscles(muscles);
    }

    writeExerciseToDatabase(exercise)
    
}
