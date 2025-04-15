import { signInCheck } from "./signIn.js";
signInCheck();
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