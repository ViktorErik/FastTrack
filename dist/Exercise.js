export class Exercise {
    constructor(name, muscles, id) {
        this.name = "";
        this.muscles = "";
        this.id = "";
        if (name)
            this.name = name;
        if (muscles)
            this.muscles = muscles;
        if (id)
            this.id = id;
    }
    setName(name) {
        this.name = name;
    }
    setMuscles(muscles) {
        this.muscles = muscles;
    }
    setId(id) {
        this.id = id;
    }
}
//# sourceMappingURL=Exercise.js.map