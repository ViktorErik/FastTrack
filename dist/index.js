import { Exercise } from "./Exercise.js";
let exerciseIndex = 0;
var exercises = new Array;
const exerciseSets = {};
// exerciseSets.set(new Exercise(), new Array)
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
                    updateExerciseData(+newExerciseDiv.id, nameInput.value, muscleInput === null || muscleInput === void 0 ? void 0 : muscleInput.value);
                    if (exerciseButton)
                        exerciseButton.textContent = nameInput.value;
                });
                muscleInput === null || muscleInput === void 0 ? void 0 : muscleInput.addEventListener("input", () => {
                    updateExerciseData(+newExerciseDiv.id, nameInput === null || nameInput === void 0 ? void 0 : nameInput.value, muscleInput.value);
                });
                exerciseButton === null || exerciseButton === void 0 ? void 0 : exerciseButton.addEventListener("click", () => {
                    localStorage.clear();
                    localStorage.setItem("exercise", exercises[+newExerciseDiv.id].name);
                    window.location.href = "tracking.html";
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
function updateExerciseData(exerciseIndex, name, muscles) {
    if (name) {
        exercises[exerciseIndex].setName(name);
    }
    if (muscles) {
        exercises[exerciseIndex].setMuscles(muscles);
    }
    //exercises[+exerciseId].setMuscles(muscles);
    //clickableName.textContent = name;
}
//# sourceMappingURL=index.js.map