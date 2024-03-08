import styles from "./FormInput.module.css";

interface FormInputProps {
  type: string;
  name: string;
  label: string;
  error?: string;
}

export default function FormInput({
  type,
  name,
  label,
  error,
}: FormInputProps) {
  return (
    <label>
      <span>{label}</span>
      <input
        type={type}
        name={name}
        className={error && styles.errorInput}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </label>
  );
}
