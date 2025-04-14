import { Exercise } from "./Exercise.js";
import { ExerciseSet } from "./ExerciseSet.js"


let exerciseIndex: number = 0;
var exercises: Exercise[] = new Array; 
const exerciseSets: any = {};
// exerciseSets.set(new Exercise(), new Array)

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
                    updateExerciseData(+newExerciseDiv.id, nameInput.value, muscleInput?.value);
                    if (exerciseButton) exerciseButton.textContent = nameInput.value;
                });
                muscleInput?.addEventListener("input", () => {
                    updateExerciseData(+newExerciseDiv.id, nameInput?.value, muscleInput.value);
                });
                exerciseButton?.addEventListener("click", () => { 
                    localStorage.clear()
                    localStorage.setItem("exercise", exercises[+newExerciseDiv.id].name);
                    window.location.href = "tracking.html"
                });
            }
            exerciseIndex++;
            console.log(newExerciseDiv, exerciseContainer);
        }
    }
    
    /*
    if (exercises.length == 0 || exercises[exercises.length-1]?.name) {
        
        const newExercise: Exercise = new Exercise();
        exercises.push(newExercise);

        const newExerciseDiv: HTMLDivElement = document.createElement("div");
        
        const clickableName: HTMLButtonElement = document.createElement("button");
        clickableName.id = "clickable" + exerciseIndex.toString();
        clickableName.classList.add("exerciseComponent");
        clickableName.addEventListener("click", () => {
            if (newExercise.name) {
                window.location.href = "tracking.html";
            }
        })

        const nameInput: HTMLInputElement = document.createElement("input");
        nameInput.id = "name" + exerciseIndex.toString();
        nameInput.placeholder = "Name";
        nameInput.classList.add("exerciseComponent");
        nameInput.addEventListener("input", () =>  {
            updateExerciseData(newExerciseDiv.id, nameInput.value, muscleInput.value, clickableName);
        });

        const muscleInput: HTMLInputElement = document.createElement("input");
        muscleInput.id = "muscles" + exerciseIndex.toString();
        muscleInput.placeholder = "Muscles worked";
        muscleInput.classList.add("exerciseComponent");
        muscleInput.addEventListener("input", () => {
            updateExerciseData(newExerciseDiv.id, nameInput.value, muscleInput.value, clickableName);
        });
        
        
        if (newExerciseDiv) {
            exerciseDiv?.appendChild(newExerciseDiv);
            newExerciseDiv.id = exerciseIndex.toString();
            newExerciseDiv.classList.add("exercise");
            
            newExerciseDiv.appendChild(clickableName);
            newExerciseDiv.appendChild(nameInput);
            newExerciseDiv.appendChild(muscleInput);
            
            
            exerciseIndex++;
        }
    }
    */
}

function updateExerciseData(exerciseIndex: number, name: string | undefined, muscles: string | undefined) {
    if (name) {
        exercises[exerciseIndex].setName(name);
    } 
    if (muscles) {
        exercises[exerciseIndex].setMuscles(muscles);
    }
    //exercises[+exerciseId].setMuscles(muscles);
    //clickableName.textContent = name;
    
}