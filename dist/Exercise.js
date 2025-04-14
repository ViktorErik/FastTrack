export class Exercise {
    constructor() {
        this.name = "";
        this.muscles = "";
        /*
        addMuscles(...muscles: string[]): void {
            for (let muscle of muscles) {
                if (!this.muscles.includes(muscle)) this.muscles.push(muscle);
            }
        }
        */
    }
    setName(name) {
        this.name = name;
    }
    setMuscles(muscles) {
        this.muscles = muscles;
    }
}
//# sourceMappingURL=Exercise.js.map