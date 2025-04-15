// Cleana upp koden för i helvete
import { ExerciseSet } from "./ExerciseSet.js";
// Load in set data n shi like that here prolly
document.addEventListener("DOMContentLoaded", () => {
    var _a;
    (_a = document.getElementById("addSetButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", addSet);
});
const sets = [];
const maxInputLenth = 10;
function isValidInput(input) {
    return (!isNaN(Number(input)) && input.length <= maxInputLenth);
}
function addSet() {
    if (sets.length == 0 || sets[sets.length - 1].reps) {
        const setBlueprint = document.getElementById("setBlueprint");
        if (setBlueprint) {
            const newSet = new ExerciseSet();
            sets.push(newSet);
            const newSetDiv = setBlueprint.cloneNode(true);
            if (newSetDiv instanceof HTMLElement)
                newSetDiv.id = "JD"; // TODO: SET UNIQUE ID
            const setContainer = document.getElementById("setContainer");
            if (newSetDiv)
                setContainer === null || setContainer === void 0 ? void 0 : setContainer.appendChild(newSetDiv);
            if (newSetDiv instanceof HTMLElement) {
                const setInput = newSetDiv.querySelector("#setInput");
                const weightInput = newSetDiv.querySelector("#weightInput");
                const repInput = newSetDiv.querySelector("#repInput");
                setInput === null || setInput === void 0 ? void 0 : setInput.addEventListener("input", () => {
                    if (isValidInput(setInput.value))
                        newSet.setSet(+setInput.value);
                    else {
                        setInput.value = "";
                        newSet.setSet(0);
                    }
                });
                weightInput === null || weightInput === void 0 ? void 0 : weightInput.addEventListener("input", () => {
                    if (isValidInput(weightInput.value))
                        newSet.setWeight(+weightInput.value);
                    else {
                        weightInput.value = "";
                        newSet.setWeight(0);
                    }
                });
                repInput === null || repInput === void 0 ? void 0 : repInput.addEventListener("input", () => {
                    if (isValidInput(repInput.value))
                        newSet.setReps(+repInput.value);
                    else {
                        repInput.value = "";
                        newSet.setReps(0);
                    }
                });
            }
        }
    }
}
//# sourceMappingURL=tracking.js.map