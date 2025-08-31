

export default class Note {
    id!: string;
    text: string = "";
    date?: Date;
    submitted: boolean = false;
    constructor(text: string, date: Date, id: string, submitted: boolean) {
        this.setSubmitted(submitted);
        this.setId(id);
        this.setText(text);
        this.setDate(date);
    }

    getDate() { return this.date }
    getText() { return this.text }
    getId() { return this.id; }
    getSubmitted() { return this.submitted; }
    setDate(date: Date) { this.date = date }
    setText(text: string) { this.text = text }
    setId(id: string) { this.id = id; }
    setSubmitted(submitted: boolean) { this.submitted = submitted }
}