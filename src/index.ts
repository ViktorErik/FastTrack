import { Exercise } from "./Exercise.js";

let exerciseDiv: HTMLElement | null = document.getElementById("exercises");

// Add global event listeners here
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("addExerciseButton")?.addEventListener("click", createNewExercise);
});

let exerciseIndex: number = 0; 
const exercises: Exercise[] = new Array; 
// let exerciseBlueprint: HTMLElement | null = document.getElementById("exercise");

function createNewExercise(): void {

    if (exercises.length == 0 || exercises[exercises.length-1]?.name) {

        exercises.push(new Exercise())

        const newExercise: HTMLDivElement = document.createElement("div");

        const clickableName: HTMLButtonElement = document.createElement("button");
        clickableName.id = "clickable" + exerciseIndex.toString();
        clickableName.classList.add("exerciseComponent");
        clickableName.addEventListener("click", () => {
            window.location.href = "tracking.html";
        })

        const nameInput: HTMLInputElement = document.createElement("input");
        nameInput.id = "name" + exerciseIndex.toString();
        nameInput.placeholder = "Name";
        nameInput.classList.add("exerciseComponent");
        nameInput.addEventListener("input", () =>  {
            updateExerciseData(newExercise.id, nameInput.value, muscleInput.value, clickableName);
        });

        const muscleInput: HTMLInputElement = document.createElement("input");
        muscleInput.id = "muscles" + exerciseIndex.toString();
        muscleInput.placeholder = "Muscles worked";
        muscleInput.classList.add("exerciseComponent");


        if (newExercise) {
            exerciseDiv?.appendChild(newExercise);
            newExercise.id = exerciseIndex.toString();
            newExercise.classList.add("exercise");

            newExercise.appendChild(clickableName);
            newExercise.appendChild(nameInput);
            newExercise.appendChild(muscleInput);

        
        exerciseIndex++;
        }
    }
}

function updateExerciseData(exerciseId: string, name: string, muscles: string, clickableName : HTMLButtonElement) {
    exercises[+exerciseId].name = name;
    exercises[+exerciseId].muscles = muscles;
    clickableName.textContent = name;
    
}