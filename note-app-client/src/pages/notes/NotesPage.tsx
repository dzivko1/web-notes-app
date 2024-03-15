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

interface NoteInputData {
  id: string | null;
  title: string;
  content: string;
}

export default function NotesPage() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]);
  const [mainNoteData, setMainNoteData] = useState<NoteInputData>({
    id: null,
    title: "",
    content: "",
  });
  const [editedNoteData, setEditedNoteData] = useState<NoteInputData | null>(
    null,
  );
  const [confirmDeleteNoteId, setConfirmDeleteNoteId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    noteService.getNotes().then((response) => {
      if (response === "unauthorized") return navigate("/login");
      setNotes(response);
    });
  }, []);

  async function addNote() {
    const note: Note = await noteService.addNote(
      mainNoteData.title,
      mainNoteData.content,
    );
    setNotes([...notes, note]);
    clearMainNote();
  }

  async function updateNote() {
    if (editedNoteData?.id) {
      const updatedNote: Note = await noteService.updateNote(
        editedNoteData.id,
        editedNoteData.title,
        editedNoteData.content,
      );
      setNotes(
        notes.map((note) =>
          note._id === updatedNote._id ? updatedNote : note,
        ),
      );
    }
  }

  async function deleteNote(id: string) {
    await noteService.deleteNote(id);
    setNotes(notes.filter((note) => note._id !== id));
    setEditedNoteData(null);
  }

  function clearMainNote() {
    setMainNoteData({ id: null, title: "", content: "" });
  }

  return (
    <>
      <main className={styles.container}>
        <NoteInput>
          <NoteView
            isEditable={true}
            title={mainNoteData.title}
            onTitleChange={(title) => {
              setMainNoteData({ ...mainNoteData, title: title });
            }}
            content={mainNoteData.content}
            onContentChange={(content) => {
              setMainNoteData({ ...mainNoteData, content: content });
            }}
            onClick={() => {}}
            onDeleteClick={clearMainNote}
          />
          <button
            disabled={
              !mainNoteData.title.trim() || !mainNoteData.content.trim()
            }
            onClick={addNote}
          >
            Save
          </button>
        </NoteInput>

        <NotesList
          notes={notes}
          onNoteClick={(note) =>
            setEditedNoteData(
              note && {
                id: note._id,
                title: note.title,
                content: note.content,
              },
            )
          }
          onDeleteClick={(id) => setConfirmDeleteNoteId(id)}
        />
      </main>

      {editedNoteData && (
        <Dialog onDismiss={() => setEditedNoteData(null)}>
          <div className={dialogStyles.dialogBubble}>
            <NoteView
              isEditable={true}
              title={editedNoteData.title}
              onTitleChange={(title) => {
                setEditedNoteData({ ...editedNoteData, title: title });
              }}
              content={editedNoteData.content}
              onContentChange={(content) => {
                setEditedNoteData({ ...editedNoteData, content: content });
              }}
              onClick={() => {}}
              onDeleteClick={() => {
                setConfirmDeleteNoteId(editedNoteData.id);
              }}
            />
            <button
              disabled={
                !editedNoteData.title.trim() || !editedNoteData.content.trim()
              }
              onClick={updateNote}
            >
              Save
            </button>
          </div>
        </Dialog>
      )}

      {confirmDeleteNoteId && (
        <Dialog onDismiss={() => setConfirmDeleteNoteId(null)}>
          <div className={dialogStyles.dialogBubble}>
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
          </div>
        </Dialog>
      )}
    </>
  );
}
