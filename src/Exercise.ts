
export class Exercise {
    name: string = "";
    muscles: string = "";

    constructor(name?: string, muscles?: string) {
        if (name) this.name = name;
        if (muscles) this.muscles = muscles;

    }

    setName(name: string): void {
        this.name = name;
    }

    setMuscles(muscles: string): void {
        this.muscles = muscles;
    }
}