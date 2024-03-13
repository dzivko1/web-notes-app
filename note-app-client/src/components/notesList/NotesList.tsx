import { Note } from "../../models/Note";
import "./NotesList.css";
import NoteView from "../noteView/NoteView";

export default function NotesList({
  notes,
  onDeleteClick,
}: {
  notes: Note[];
  onDeleteClick: (id: string) => void;
}) {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteView
          key={note._id}
          title={note.title}
          onTitleChange={() => {}}
          content={note.content}
          onContentChange={() => {}}
          onDeleteClick={() => onDeleteClick(note._id)}
        />
      ))}
    </div>
  );
}
