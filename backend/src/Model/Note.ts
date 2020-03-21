import {BrokerageNote} from 'protocol';

const notes:BrokerageNote[] = [];

export default {
  getNotes() {
    return notes;
  },
  saveNote(note: BrokerageNote) {
    notes.push(note);
  }
};