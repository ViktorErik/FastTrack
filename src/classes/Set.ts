export default class Set {

    id!: string;
    setNumber: string = "";
    weight: string = "";
    reps: string = "";
    submitted: boolean = false;
    date?: Date;

    constructor(id: string, setNumber: string = "", weight: string = "", reps: string = "", submitted: boolean, date?: Date) {
        this.setId(id);
        this.setSetNumber(setNumber);
        this.setWeight(weight);
        this.setReps(reps);
        this.setSubmitted(submitted);
        if (date) this.setDate(date);
    }

    getId() {
        return this.id;
    }
    getSetNumber() {
        return this.setNumber;
    }

    getWeight() {
        return this.weight;
    }
    getReps() {
        return this.reps;
    }
    getSubmitted() {
        return this.submitted;
    }
    getDate() {
        return this.date;
    }


    setDate(date: Date) {
        this.date = date;
    }
    setSubmitted(submitted: boolean) {
        this.submitted = submitted
    }

    setId(id: string) {
        this.id = id;
    }
    setSetNumber(setNumber: string) {
        this.setNumber = setNumber;
    }

    setWeight(weight: string) {
        this.weight = weight;
    }
    setReps(reps: string) {
        this.reps = reps;
    }
}