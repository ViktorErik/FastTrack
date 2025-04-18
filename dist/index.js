var _a, _b;
import { signInUser, curUser, signOutUser } from "./signIn.js";
import { db, doc, setDoc } from "./databaseHandler.js";
import { Exercise } from "./Exercise.js";
await signInUser();
await setDoc(doc(db, "users", curUser.uid), {}); // Register userID, doesn't cause duplicates
(_a = document.getElementById("signOutButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", signOutUser);
console.log(curUser);
(_b = document.getElementById("addExerciseButton")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", initializeExercise);
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
let exerciseIndex = 0;
var exercises = [];
const exerciseSets = {};
const nameLength = 50;
function loadExercises(exercises) {
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
    const newExercise = new Exercise();
    displayExercise(newExercise);
}
function displayExercise(exercise) {
    const exerciseBlueprint = document.getElementById("exerciseBlueprint");
    if (exerciseBlueprint) {
        exercises.push(exercise);
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
            if (nameInput)
                nameInput.value = exercise.name;
            if (muscleInput)
                muscleInput.value = exercise.muscles;
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
function updateExerciseData(exerciseIndex, name, muscles) {
    if (name) {
        exercises[exerciseIndex].setName(name);
    }
    if (muscles) {
        exercises[exerciseIndex].setMuscles(muscles);
    }
}
//# sourceMappingURL=index.js.map