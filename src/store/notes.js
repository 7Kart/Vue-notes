export default {
    state: {
        notes: [
            {
                title: "First note",
                descr: "descripption for first note",
                date: new Date(Date.now()).toLocaleString(),
                priority: "ordinary"
            },
            {
                title: "Second note",
                descr: "descripption for second note",
                date: new Date(Date.now()).toLocaleString(),
                priority: "important"
            },
            {
                title: "Third note",
                descr: "descripption for third note",
                date: new Date(Date.now()).toLocaleString(),
                priority: "very-important"
            }
        ],
        note: {
            title: "",
            descr: "",
            priority: ""
        }
    },
    getters: {
        getAllNotes(state) {
            return state.notes;
        },
        getNoteByIndex: (state) => (index) => {
            return state.notes[index]
        },
        getEmptytNote(state) {
            return state.note
        },
        getFilteredNotes: (state) => (searchStr) => {
            if(!searchStr) return state.notes;
            return state.notes.filter((note)=> {
                return note.title.trim().toLowerCase().indexOf(searchStr) != -1;
            }); 
        }
    },
    mutations: {
        addNewNote(state, note) {
            state.notes.push({
                title: note.title,
                descr: note.descr,
                priority: note.priority,
                date: new Date(Date.now()).toLocaleString()
            });
        },
        removeNote(state, noteIndx) {
            state.notes.splice(noteIndx, 1);
        },
        editNote(state, noteEdition){
            if(noteEdition.newValue.trim().length > 0){
                let note = state.notes[noteEdition.index];
                note[noteEdition.field] = noteEdition.newValue;
                note.date = new Date(Date.now()).toLocaleString();
            }
        }
    },
    actions: {
        addNewNote({ commit }, payload) {
            commit('addNewNote', payload);
        },
        removeNote({ commit }, payload) {
            commit('removeNote', payload);
        },
        editNote({ commit }, payload){
            commit('editNote', payload);
        }
    }
}