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
          />
        </label>
        <label>
          <span>Password</span>
          <input
            type="text"
            name="password"
          />
        </label>
        <label>
          <span>First name</span>
          <input
            type="text"
            name="firstName"
          />
        </label>
        <label>
          <span>Last name</span>
          <input
            type="text"
            name="lastName"
          />
        </label>
        <button type="submit">Submit</button>
      </Form>

      <Link to="/login">Log in</Link>
    </div>
  );
}
