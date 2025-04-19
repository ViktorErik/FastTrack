
export class Exercise {
    name: string = "";
    muscles: string = "";
    id: string = "";

    constructor(name?: string, muscles?: string, id?: string) {
        if (name) this.name = name;
        if (muscles) this.muscles = muscles;
        if (id) this.id = id;

    }

    setName(name: string): void {
        this.name = name;
    }

    setMuscles(muscles: string): void {
        this.muscles = muscles;
    }

    setId(id: string): void {
        this.id = id;
    }
}