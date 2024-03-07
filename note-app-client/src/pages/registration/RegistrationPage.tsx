import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useActionData,
} from "react-router-dom";
import authService from "../../services/authService.ts";

async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  formData.delete("repeatPassword");
  const result = await authService.registerUser(formData);
  switch (result.type) {
    case "success":
      return redirect("/");
    case "conflict":
      return "Username is already taken.";
  }
}

RegistrationPage.action = action;

export default function RegistrationPage() {
  const message = useActionData() as string | undefined;

  function validatePassword() {
    const passwordInput = document.getElementsByName(
      "password",
    )[0] as HTMLInputElement;
    const repeatPasswordInput = document.getElementsByName(
      "repeatPassword",
    )[0] as HTMLInputElement;
    if (passwordInput.value !== repeatPasswordInput.value) {
      repeatPasswordInput.setCustomValidity("Password fields must match.");
    } else {
      repeatPasswordInput.setCustomValidity("");
    }
  }

  return (
    <div className="center-container">
      <Form
        replace
        method="post"
        className="auth-form"
      >
        <h1>Register</h1>
        {message && <strong>{message}</strong>}
        <label>
          <span>Username</span>
          <input
            type="text"
            name="username"
            required
            minLength={3}
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="password"
            name="password"
            onChange={validatePassword}
            required
            minLength={6}
          />
        </label>
        <label>
          <span>Repeat password</span>
          <input
            type="password"
            name="repeatPassword"
            onChange={validatePassword}
            required
            minLength={6}
          />
        </label>
        <label>
          <span>First name</span>
          <input
            type="text"
            name="firstName"
            required
          />
        </label>
        <label>
          <span>Last name</span>
          <input
            type="text"
            name="lastName"
            required
          />
        </label>
        <button type="submit">Submit</button>
      </Form>

      <Link to="/login">Log in</Link>
    </div>
  );
}
