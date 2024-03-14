import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./Root.module.css";
import authService from "../services/authService.ts";
import { useEffect, useState } from "react";
import { User } from "../models/user.ts";

export default function Root() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    authService.getLoggedInUser().then((user) => {
      setUser(user);
    });
  }, [location]);

  async function logOut() {
    await authService.logoutUser();
    navigate("/login", { replace: true });
  }

  return (
    <>
      <header className={styles.header}>
        <span className={styles.appName}>Notes app</span>
        {user && (
          <div className={styles.headerActions}>
            <div>
              Hello,
              <br />
              <strong>{user.username}</strong>
            </div>
            <button onClick={logOut}>Log out</button>
          </div>
        )}
      </header>
      <Outlet />
    </>
  );
}
