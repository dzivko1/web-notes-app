import React from "react";
import styles from "./NoteInput.module.css";

export default function NoteInput({ children }: React.PropsWithChildren) {
  return (
    <div className={styles.noteInput}>
      <div>{children}</div>
    </div>
  );
}
