import { useEffect, useState } from 'react'
import './App.css'
import { Note } from './models/Note'
import NoteInput from './components/noteInput/NoteInput'
import NotesList from "./components/notesList/NotesList"

function App() {
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    fetch("/api/notes")
      .then((res: Response) => res.json())
      .then((notes: Note[]) => setNotes(notes))
  }, [])

  return (
    <>
      <header>Note Taker App</header>
      <main>
        <NoteInput onNewNote={(note) => setNotes(notes.concat(note))} />
        <NotesList notes={notes} />
      </main>
    </>
  )
}

export default App
