import styles from "./Dialog.module.css";
import React from "react";

export default function Dialog({
  onDismiss,
  children,
}: {
  onDismiss: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className={styles.dialog}
      onClick={onDismiss}
    >
      <div className={styles.content}>{children}</div>
    </div>
  );
}
