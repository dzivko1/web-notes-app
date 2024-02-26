import { useEffect, useState } from "react";
import "./App.css";
import { Note } from "./models/Note";
import NoteInput from "./components/noteInput/NoteInput";
import NotesList from "./components/notesList/NotesList";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetch("/api/notes")
      .then((res: Response) => res.json())
      .then((notes: Note[]) => setNotes(notes));
  }, []);

  async function deleteNote(id: string) {
    const res = await fetch("/api/notes/" + id, { method: "DELETE" });
    if (res.ok) setNotes(notes.filter((note) => note.id !== id));
  }

  return (
    <>
      <header>Note Taker App</header>
      <main>
        <NoteInput onNewNote={(note) => setNotes(notes.concat(note))} />
        <NotesList notes={notes} onDeleteClick={(id) => deleteNote(id)} />
      </main>
    </>
  );
}

export default App;
