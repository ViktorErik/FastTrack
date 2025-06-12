export default class Set {

    id!: string;
    setNumber: string = "";
    weight: string = "";
    reps: string = "";

    constructor(id: string, setNumber: string = "", weight: string = "", reps: string = "", ) {
        this.setId(id);
        this.setSetNumber(setNumber);
        this.setWeight(weight);
        this.setReps(reps);
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