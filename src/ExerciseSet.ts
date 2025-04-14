export class ExerciseSet {
    weight: number | null = null;;
    reps: number | null = null;

    setWeight(weight: number): void {
        this.weight = weight;
    }
    setReps(reps: number): void {
        this.reps = reps;
    }
}