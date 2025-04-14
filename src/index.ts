import { Exercise } from "./Exercise.js";

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