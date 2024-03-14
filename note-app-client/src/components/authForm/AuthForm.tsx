import { Form } from "react-router-dom";
import React from "react";
import styles from "./AuthForm.module.css";

interface AuthFormProps {
  title: string;
  error?: string;
  children: React.ReactNode;
}

export default function AuthForm({ title, error, children }: AuthFormProps) {
  return (
    <Form
      replace
      method="post"
      className={styles.authForm}
    >
      <h1>{title}</h1>
      {error && <span className="error-text">{error}</span>}
      {children}
    </Form>
  );
}
