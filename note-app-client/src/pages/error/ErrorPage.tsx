import { useRouteError } from "react-router-dom";
import styles from "./ErrorPage.module.css";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <main className={styles.container}>
      <h1>Oops!</h1>
      <p>An error has ocurred!</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </main>
  );
}
