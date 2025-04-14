export class ExerciseSet {
    weight: number = 0;
    reps: number = 0;
    set: number = 0;

    setWeight(weight: number): void {
        this.weight = weight;
    }
    setReps(reps: number): void {
        this.reps = reps;
    }
    setSet(set: number) {
        this.set = set;
    }
}