// Cleana upp koden för i helvete

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("addSetButton")?.addEventListener("click", addSet);
});


function addSet(): void {
    
    const setBlueprint: HTMLElement | null = document.getElementById("setBlueprint");
    if (setBlueprint) {
        console.log(localStorage.getItem("exercise"));
        const newSet: Node | null = setBlueprint.cloneNode(true);
        if (newSet instanceof HTMLElement) newSet.id = "JD";
        const setContainer: HTMLElement | null = document.getElementById("setContainer");
        if (newSet) setContainer?.appendChild(newSet);
    }
}