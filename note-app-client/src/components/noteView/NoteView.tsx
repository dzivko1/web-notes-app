import "./NoteView.css";

interface NoteViewProps {
  isEditable?: boolean;
  title: string;
  onTitleChange: (title: string) => void;
  content: string;
  onContentChange: (content: string) => void;
  onDeleteClick: () => void;
}

export default function NoteView({
  isEditable = false,
  title,
  onTitleChange,
  content,
  onContentChange,
  onDeleteClick,
}: NoteViewProps) {
  return (
    <div className="note">
      <div className="note-handle">
        {isEditable ? (
          <input
            className="title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
        ) : (
          <div className="title">{title}</div>
        )}

        <button className="delete" onClick={onDeleteClick}>
          x
        </button>
      </div>

      {isEditable ? (
        <div className="note-block">
          <textarea
            className="note-content"
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
          />
        </div>
      ) : (
        <div className="note-content">{content}</div>
      )}
    </div>
  );
}
