export default class Exercise {
    name: string = "";
    muscles: string = "";
    id!: string;
    submitted: boolean = false;
    description: string = "";
    orderNumber: number = 1;

    constructor(id: string, name: string = "", muscles: string = "", submitted: boolean = false, description: string = "", orderNumber: number = 1) {
        this.setName(name);
        this.setMuscles(muscles);
        this.setId(id);
        this.setSubmitted(submitted);
        this.setDescription(description);
        this.setOrderNumber(orderNumber);
    }

    getOrderNumber(): number {
        return this.orderNumber;
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
    getDescription(): string {
        return this.description;
    }

    setDescription(description: string) {
        this.description = description;
    }

    setSubmitted(submitted: boolean) {
        this.submitted = submitted;
    }

    setOrderNumber(orderNumber: number) {
        this.orderNumber = orderNumber;
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