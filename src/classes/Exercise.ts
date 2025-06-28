export default class Exercise {
    name: string = "";
    muscles: string = "";
    id!: string;
    submitted: boolean = false;

    constructor(id: string, name: string = "", muscles: string = "", submitted: boolean = false) {
        this.setName(name);
        this.setMuscles(muscles);
        this.setId(id);
        this.setSubmitted(submitted);
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
    getSubmitted(): boolean {
        return this.submitted;
    }

    setSubmitted(submitted: boolean) {
        this.submitted = submitted;
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