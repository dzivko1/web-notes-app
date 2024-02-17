import { useEffect, useState } from 'react'
import './App.css'
import { Note } from './models/note'

function App() {
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    fetch("http://localhost:3000/api/notes")
      .then((res: Response) => res.json())
      .then((notes: Note[]) => setNotes(notes))
  }, [])

  return (
    <>
      <div>Test {notes.length > 0 && notes[0].title || "nope"}</div>
    </>
  )
}

export default App
