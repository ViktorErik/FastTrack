"use strict";
// Cleana upp koden för i helvete
document.addEventListener("DOMContentLoaded", () => {
    var _a;
    (_a = document.getElementById("addSetButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", addSet);
});
function addSet() {
    const setBlueprint = document.getElementById("setBlueprint");
    if (setBlueprint) {
        console.log(localStorage.getItem("exercise"));
        const newSet = setBlueprint.cloneNode(true);
        if (newSet instanceof HTMLElement)
            newSet.id = "JD";
        const setContainer = document.getElementById("setContainer");
        if (newSet)
            setContainer === null || setContainer === void 0 ? void 0 : setContainer.appendChild(newSet);
    }
}
//# sourceMappingURL=tracking.js.map