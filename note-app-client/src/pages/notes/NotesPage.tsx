import { useEffect, useState } from "react";
import { Note } from "../../models/note";
import NoteInput from "../../components/noteInput/NoteInput";
import NoteView from "../../components/noteView/NoteView";
import NotesList from "../../components/notesList/NotesList";
import styles from "./NotesPage.module.css";
import dialogStyles from "../../components/dialog/Dialog.module.css";
import noteService from "../../services/noteService";
import { useNavigate } from "react-router-dom";
import Dialog from "../../components/dialog/Dialog.tsx";

export default function NotesPage() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [confirmDeleteNoteId, setConfirmDeleteNoteId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    noteService.getNotes().then((response) => {
      if (response === "unauthorized") return navigate("/login");
      setNotes(response);
    });
  }, []);

  async function saveNote() {
    const note: Note = await noteService.saveNote(title, content);

    clearNote();
    setNotes(notes.concat(note));
  }

  async function deleteNote(id: string) {
    await noteService.deleteNote(id);
    setNotes(notes.filter((note) => note._id !== id));
  }

  function clearNote() {
    setTitle("");
    setContent("");
  }

  return (
    <>
      <main className={styles.container}>
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
            disabled={!title.trim() || !content.trim()}
            onClick={saveNote}
          >
            Save
          </button>
        </NoteInput>

        <NotesList
          notes={notes}
          onDeleteClick={(id) => setConfirmDeleteNoteId(id)}
        />
      </main>

      {confirmDeleteNoteId && (
        <Dialog onDismiss={() => setConfirmDeleteNoteId(null)}>
          <p>Are you sure you want to delete this note?</p>
          <div className={dialogStyles.actionsRow}>
            <button
              className="risk-button"
              onClick={() => {
                deleteNote(confirmDeleteNoteId);
                setConfirmDeleteNoteId(null);
              }}
            >
              Delete
            </button>
            <button
              className="mild-button"
              onClick={() => setConfirmDeleteNoteId(null)}
            >
              Cancel
            </button>
          </div>
        </Dialog>
      )}
    </>
  );
}
