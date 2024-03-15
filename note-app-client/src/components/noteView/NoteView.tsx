import styles from "./NoteView.module.css";

interface NoteViewProps {
  isEditable?: boolean;
  title: string;
  onTitleChange: (title: string) => void;
  content: string;
  onContentChange: (content: string) => void;
  onClick: () => void;
  onDeleteClick: () => void;
}

export default function NoteView({
  isEditable = false,
  title,
  onTitleChange,
  content,
  onContentChange,
  onClick,
  onDeleteClick,
}: NoteViewProps) {
  return (
    <div
      className={`${styles.note} ${isEditable ? styles.editableNote : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div className={styles.noteHandle}>
        {isEditable ? (
          <input
            className={styles.title}
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
        ) : (
          <div className={styles.title}>{title}</div>
        )}

        <button
          className={styles.delete}
          onClick={(e) => {
            e.stopPropagation();
            onDeleteClick();
          }}
        >
          x
        </button>
      </div>

      <div className={isEditable ? styles.noteBlock : styles.noteContent}>
        {isEditable ? (
          <textarea
            className={styles.noteContent}
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
          />
        ) : (
          <>{content}</>
        )}
      </div>
    </div>
  );
}
