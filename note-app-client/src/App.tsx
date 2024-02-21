import { useEffect, useState } from 'react'
import './App.css'
import { Note } from './models/Note'
import NoteInput from "./components/noteInput/NoteInput"
import NotesList from "./components/notesList/NotesList"
import NoteView from "./components/noteView/NoteView"
import "./utils/stringUtils"

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    fetch("/api/notes")
      .then((res: Response) => res.json())
      .then((notes: Note[]) => setNotes(notes))
  }, [])

  async function saveNote() {
    const note: Note = await (await fetch("/api/notes", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        content: content
      })
    })).json()

    clearNote()
    setNotes(notes.concat(note))
  }

  async function deleteNote(id: string) {
    const res = await fetch("/api/notes/" + id, { method: "DELETE" })
    if (res.ok) setNotes(notes.filter((note) => note.id !== id))
  }

  function clearNote() {
    setTitle("")
    setContent("")
  }

  return (
    <>
      <header>Notes App</header>
      <main>
        <NoteInput>
          <NoteView
            isEditable={true}
            title={title}
            onTitleChange={setTitle}
            content={content}
            onContentChange={setContent}
            onDeleteClick={clearNote}
          />
          <button
            className="save"
            disabled={title.isBlank() || content.isBlank()}
            onClick={saveNote}
          >Save</button>
        </NoteInput>

        <NotesList
          notes={notes}
          onDeleteClick={(id) => deleteNote(id)}
        />
      </main>
    </>
  )
}

export default App
