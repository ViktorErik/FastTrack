
export class Exercise {
    name: string = "";
    muscles: string = "";

    setName(name: string): void {
        this.name = name;
    }

    setMuscles(muscles: string): void {
        this.muscles = muscles;
    }

    /*
    addMuscles(...muscles: string[]): void {
        for (let muscle of muscles) {
            if (!this.muscles.includes(muscle)) this.muscles.push(muscle);
        }
    }
    */

}