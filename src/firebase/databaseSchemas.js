import { serverTimestamp } from "firebase/firestore";

class NotesSchema {
    constructor(_note, _date, _tags) {
        this.note = _note;
        this.date = _date;
        this.timeSaved = serverTimestamp();
        this.tags = _tags;
    }

    setTimeStamp(time) {
        this.timeSaved = time;
    }
}

const NotesConverter = {
    toFirestore: (note) => {
        return {
            note: note.note,
            tags: note.tags,
            date: note.date,
            timeSaved: note.timeSaved
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        const id = snapshot.id; // Get the document ID
        let note = new NotesSchema(data.note, data.date, data.tags);
        note.setTimeStamp(data.timeSaved);
        note.id = id; // Assign the document ID to the note object
        return note;
    }
};

export { NotesSchema };
export { NotesConverter };
