import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import { collection, getDocs, getFirestore, orderBy, query, addDoc, doc, limit, startAfter, setDoc, getDoc } from "firebase/firestore";
import Authentication from "./authentication";
import { NotesConverter, NotesSchema } from "./databaseSchemas";
import { resolvePath } from "react-router-dom";

class NotesDatabase {
    constructor() {
        const app = initializeApp(firebaseConfig);
        this.db = getFirestore(app);
        this.auth = new Authentication();
    }

    getNotesBatch(lastVisible = null) {
        let uid = this.auth.getUid();
        const userCollection = collection(this.db, uid);
        let userQuery;

        if (lastVisible) {
            userQuery = query(userCollection, orderBy('date', 'desc'), startAfter(lastVisible), limit(20));
        } else {
            userQuery = query(userCollection, orderBy('date', 'desc'), limit(20));
        }

        return new Promise((resolve, reject) => {
            getDocs(userQuery).then(snapshot => {
                let notesList = [];
                snapshot.forEach(element => {
                    const document = NotesConverter.fromFirestore(element, {});
                    notesList.push(document);
                });

                // Get the last visible document
                const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];

                resolve({ notes: notesList, lastVisible: lastVisibleDoc });
            }).catch(e => {
                reject(e);
            });
        });
    }

    getCards() {
        const cardsDocRef = doc(this.db, 'love', 'cards');

        return new Promise((resolve, reject) => {
            getDoc(cardsDocRef).then(docSnapshot => {
                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    const cardsList = data.cards || []; // Assuming the list of strings is stored under the 'cards' field
                    resolve(cardsList);
                } else {
                    reject(new Error('Document does not exist'));
                }
            }).catch(e => {
                reject(e);
            });
        });
    }

    saveNote(_note, _date, _tags, id) {
        let note = new NotesSchema(_note, _date, _tags);
        const userCollection = collection(this.db, this.auth.getUid()).withConverter(NotesConverter);

        if (id) {
            const noteRef = doc(userCollection, id);
            return new Promise((res, reject) => {
                setDoc(noteRef, note).then(() => {
                    res(res);
                }).catch((e) => {
                    reject(e);
                });
            })

        } else {
            return new Promise((res, reject) => {
                addDoc(userCollection, note).then(() => { res(res) })
                    .catch((e) => reject(e));
            })
        }
    }
}

export default NotesDatabase;
