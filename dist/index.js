var _a, _b;
import { signInUser, curUser, signOutUser } from "./signIn.js";
import { addDoc, collection, db, doc, setDoc, getDocs } from "./databaseHandler.js";
import { Exercise } from "./Exercise.js";
await signInUser();
(_a = document.getElementById("signOutButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", initNewUser);
(_b = document.getElementById("addExerciseButton")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", initializeExercise);
let exerciseIndex = 0;
var exercises = [];
const exerciseSets = {};
const maxInputLength = 50;
initializeUserExercises();
const signOutButton = document.getElementById("signOutButton");
if (signOutButton)
    signOutButton.textContent = curUser.email;
async function initNewUser() {
    const signOutButton = document.getElementById("signOutButton");
    await signOutUser();
    if (signOutButton)
        signOutButton.textContent = curUser ? curUser.email : "Signed out";
    removeExercisesAndExerciseElements();
    await signInUser();
    if (signOutButton)
        signOutButton.textContent = curUser.email;
    if (curUser)
        initializeUserExercises();
}
async function initializeUserExercises() {
    if (curUser) {
        const userExercises = await getDocs(collection(db, "users", curUser.uid, "exercises"));
        userExercises.forEach((exercise) => {
            const exerciseData = exercise.data();
            exercises.push(new Exercise(exerciseData["name"], exerciseData["muscles"], exerciseData["id"]));
        });
    }
    displayAllExercises(exercises);
}
function displayAllExercises(exercises) {
    for (const exercise of exercises) {
        displayExercise(exercise);
    }
}
async function initializeExercise() {
    const docRef = await addDoc(collection(db, "users", curUser.uid, "exercises"), {});
    const newExercise = new Exercise();
    newExercise.setId(docRef.id);
    exercises.push(newExercise);
    writeExerciseToDatabase(newExercise);
    displayExercise(newExercise);
}
async function writeExerciseToDatabase(exercise) {
    await setDoc(doc(db, "users", curUser.uid, "exercises", exercise.id), {
        name: exercise.name,
        muscles: exercise.muscles,
        id: exercise.id
    });
}
function displayExercise(exercise) {
    const exerciseBlueprint = document.getElementById("exerciseBlueprint");
    if (exerciseBlueprint) {
        const newExerciseDiv = exerciseBlueprint.cloneNode(true);
        // if (newExerciseDiv instanceof HTMLElement) newExerciseDiv.id = exercise.id;// exerciseIndex.toString();
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
            if (exerciseButton)
                exerciseButton.textContent = exercise.name;
            nameInput === null || nameInput === void 0 ? void 0 : nameInput.addEventListener("input", () => {
                if (nameInput.value.length <= maxInputLength) {
                    updateExerciseData(exercise, nameInput.value, muscleInput === null || muscleInput === void 0 ? void 0 : muscleInput.value);
                    if (exerciseButton)
                        exerciseButton.textContent = nameInput.value;
                }
                else {
                    if (exerciseButton === null || exerciseButton === void 0 ? void 0 : exerciseButton.textContent)
                        nameInput.value = exerciseButton.textContent;
                }
            });
            muscleInput === null || muscleInput === void 0 ? void 0 : muscleInput.addEventListener("input", () => {
                if (muscleInput.value.length <= maxInputLength) {
                    // updateExerciseData(+newExerciseDiv.id, nameInput?.value, muscleInput.value);
                    updateExerciseData(exercise, nameInput === null || nameInput === void 0 ? void 0 : nameInput.value, muscleInput === null || muscleInput === void 0 ? void 0 : muscleInput.value);
                }
            });
            exerciseButton === null || exerciseButton === void 0 ? void 0 : exerciseButton.addEventListener("click", () => {
                // localStorage.clear()
                // localStorage.setItem("exercise", exercises[+newExerciseDiv.id].name);
                window.location.href = `tracking.html?id=${exercise.id}`;
            });
        }
        exerciseIndex++;
    }
}
function updateExerciseData(exercise, name, muscles) {
    if (name) {
        exercise.setName(name);
    }
    if (muscles) {
        exercise.setMuscles(muscles);
    }
    writeExerciseToDatabase(exercise);
}
function removeExercisesAndExerciseElements() {
    exercises = [];
    const elements = document.querySelectorAll("#exerciseContainer > *");
    elements.forEach((element) => {
        element.remove();
    });
}
//# sourceMappingURL=index.js.map