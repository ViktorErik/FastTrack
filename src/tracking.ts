// Cleana upp koden för i helvete

import { ExerciseSet } from "./ExerciseSet.js";

// Load in set data n shi like that here prolly

const sets: ExerciseSet[] = [];

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("addSetButton")?.addEventListener("click", addSet);
});

function isValidInput(input: any) {
    return (!isNaN(Number(input)) && Number(input) < 10**6);
}

function addSet(): void {

    if (sets.length == 0 || sets[sets.length-1].reps) {
        
        
        const setBlueprint: HTMLElement | null = document.getElementById("setBlueprint");
        if (setBlueprint) {


            const newSet: ExerciseSet = new ExerciseSet();
            sets.push(newSet);
            console.log(sets)

            const newSetDiv: Node | null = setBlueprint.cloneNode(true);
            if (newSetDiv instanceof HTMLElement) newSetDiv.id = "JD"; // TODO: SET UNIQUE ID
            const setContainer: HTMLElement | null = document.getElementById("setContainer");
            if (newSetDiv) setContainer?.appendChild(newSetDiv);
            
            if (newSetDiv instanceof HTMLElement) {
                const setInput: HTMLInputElement | null = newSetDiv.querySelector("#setInput");
                const weightInput: HTMLInputElement | null = newSetDiv.querySelector("#weightInput");
                const repInput: HTMLInputElement | null = newSetDiv.querySelector("#repInput");

            
                setInput?.addEventListener("input", () => {
                    if (isValidInput(setInput.value)) newSet.setSet(+setInput.value);
                    else {
                        setInput.value = "";
                        newSet.setSet(0);
                    } 
                });
                
                weightInput?.addEventListener("input", () => {
                    if (isValidInput(weightInput.value)) newSet.setWeight(+weightInput.value);
                    else {
                        weightInput.value = "";
                        newSet.setWeight(0);
                    }
                });
                
                repInput?.addEventListener("input", () => {
                    if (isValidInput(repInput.value)) newSet.setReps(+repInput.value);
                    else {
                        repInput.value = "";
                        newSet.setReps(0);
                    }
                });
            }
        }
    }
}