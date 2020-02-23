import moment from 'moment';
import { initializeEditPage, generateLastEdited } from './views';
import { updateNote, removeNote } from './notes';

const titleElement = document.querySelector('#note-title');
const bodyElement = document.querySelector('#note-body');
const timestampElement = document.querySelector('#note-timestamp');
const removeElement = document.querySelector('#remove-note');
const timestamp = moment().valueOf();
const noteId = location.hash.substring(1);

initializeEditPage(noteId);

titleElement.addEventListener('input', (e) => {
  const note = updateNote(noteId, {
    title: e.target.value
  });
  timestampElement.textContent = generateLastEdited(note.updatedAt);
});

bodyElement.addEventListener('input', (e) => {
  const note = updateNote(noteId, {
    body: e.target.value
  }); 
  timestampElement.textContent = generateLastEdited(note.updatedAt);
});

removeElement.addEventListener('click', (e) => {
  removeNote(noteId);
  location.assign('/index.html');
});

window.addEventListener('storage', (e) => {
  if (e.key === 'notes') {
    initializeEditPage(noteId);
  }
});