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
  const response = await authService.authUser(formData);
  switch (response.type) {
    case "success":
      return redirect("/");
    case "invalid":
      return "Invalid details";
  }
}

LoginPage.action = action;

export default function LoginPage() {
  const message = useActionData() as string | undefined;

  return (
    <div className="center-container">
      <Form
        replace
        method="post"
        className="auth-form"
      >
        <h1>Log in</h1>
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
        <button type="submit">Submit</button>
      </Form>

      <Link to="/register">Register</Link>
    </div>
  );
}
