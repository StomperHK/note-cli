import { getDatabaseData, setDatabaseData } from "./db.js";

export async function createNote(noteData) {
  const data = JSON.parse(await getDatabaseData());

  data.notes.push(noteData);

  await setDatabaseData(data);

  return noteData;
}

export async function returnNotesAsArray() {
  return JSON.parse(await getDatabaseData()).notes
}

export async function listAllNotes() {
  const data = JSON.parse(await getDatabaseData());
  const notes = data.notes.map(
    ({ title, tags, desc }) =>
      `${title} ${tags ? `(${tags})` : ""}${desc ?` - ${desc}` : ""}`
  );

  return notes;
}

export async function filterNotes(text) {
  const notes = await listAllNotes();
  
  return notes.filter((note) => note.includes(text));
}

export async function removeNoteById(id) {
  const notes = (await getDatabaseData()).notes;

  const match = notes.find((note) => note.id === id);

  if (match) {
    const newData = notes.filter((note) => note.id !== id);

    await setDatabaseData(newData);

    console.log("removed note");
    return;
  }

  console.log("note not found.");
}

export async function deleteAllNotes() {
  const newData = {
    notes: [],
  };

  await setDatabaseData(newData);
}


