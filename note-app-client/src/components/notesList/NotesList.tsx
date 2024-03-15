import { Note } from "../../models/note";
import "./NotesList.css";
import NoteView from "../noteView/NoteView";

interface NotesListProps {
  notes: Note[];
  onNoteClick: (id: Note | null) => void;
  onDeleteClick: (id: string) => void;
}

export default function NotesList({
  notes,
  onNoteClick,
  onDeleteClick,
}: NotesListProps) {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteView
          key={note._id}
          title={note.title}
          onTitleChange={() => {}}
          content={note.content}
          onContentChange={() => {}}
          onClick={() => onNoteClick(note)}
          onDeleteClick={() => onDeleteClick(note._id)}
        />
      ))}
    </div>
  );
}
