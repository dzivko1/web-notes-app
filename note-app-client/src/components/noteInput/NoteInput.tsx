import React from "react";
import "./NoteInput.css";

export default function NoteInput({ children }: React.PropsWithChildren) {
  return (
    <div className="note-input">
      <div>{children}</div>
    </div>
  );
}
