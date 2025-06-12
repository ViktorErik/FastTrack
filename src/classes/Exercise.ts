export default class Exercise {
    name: string = "";
    muscles: string = "";
    id!: string;

    constructor(id: string, name: string = "", muscles: string = "") {
        this.setName(name);
        this.setMuscles(muscles);
        this.setId(id);
    }

    getName(): string {
        return this.name;
    }
    getMuscles(): string {
        return this.muscles;
    }
    getId(): string {
        return this.id;
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