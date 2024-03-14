import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useActionData,
} from "react-router-dom";
import authService from "../../services/authService.ts";
import FormInput from "../../components/formInput/FormInput.tsx";
import AuthForm from "../../components/authForm/AuthForm.tsx";

interface LoginFormErrors {
  username: string;
  password: string;
  other: string;
}

function validateForm(formData: FormData): Partial<LoginFormErrors> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const errors: Partial<LoginFormErrors> = {};

  if (username.length === 0) {
    errors.username = "Username is required";
  }

  if (password.length === 0) {
    errors.password = "Password is required";
  }

  return errors;
}

async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const errors = validateForm(formData);

  if (Object.values(errors).some((value) => value.length > 0)) {
    return errors;
  }

  const response = await authService.authUser(formData);
  switch (response.type) {
    case "success":
      return redirect("/");
    case "invalid":
      errors.other = "Invalid details";
      return errors;
  }
}

LoginPage.action = action;

export default function LoginPage() {
  const errors = useActionData() as LoginFormErrors | undefined;

  return (
    <div className="center-container">
      <AuthForm
        title="Log in"
        error={errors?.other}
      >
        <FormInput
          type="text"
          name="username"
          label="Username"
          error={errors?.username}
        />
        <FormInput
          type="password"
          name="password"
          label="Password"
          error={errors?.password}
        />
        <button type="submit">Submit</button>
      </AuthForm>

      <Link to="/register">Register</Link>
    </div>
  );
}
