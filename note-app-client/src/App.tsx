import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import NotesPage from "./pages/notes/NotesPage.tsx";
import ErrorPage from "./pages/error/ErrorPage.tsx";
import RegistrationPage from "./pages/registration/RegistrationPage.tsx";
import LoginPage from "./pages/login/LoginPage.tsx";
import Root from "./pages/Root.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route
          path="register"
          element={<RegistrationPage />}
          action={RegistrationPage.action}
        />
        <Route
          path="login"
          element={<LoginPage />}
          action={LoginPage.action}
        />
        <Route
          index
          element={<NotesPage />}
        />
      </Route>
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
