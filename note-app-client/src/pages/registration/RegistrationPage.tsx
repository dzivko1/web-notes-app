import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useActionData,
} from "react-router-dom";
import authService from "../../services/authService.ts";
import FormInput from "../../components/formInput/FormInput.tsx";

interface RegistrationFormErrors {
  username: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
  other: string;
}

function validateForm(formData: FormData): Partial<RegistrationFormErrors> {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const repeatPassword = formData.get("repeatPassword") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const errors: Partial<RegistrationFormErrors> = {};

  if (username.length < 3) {
    errors.username = "Username must have at least 3 characters";
  }

  if (password.length < 6) {
    errors.password = "Password must have at least 6 characters";
  }

  if (repeatPassword !== password) {
    errors.repeatPassword = "Password fields must match";
  }

  if (firstName.length === 0) {
    errors.firstName = "A first name is required";
  }

  if (lastName.length === 0) {
    errors.lastName = "A last name is required";
  }

  return errors;
}

async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const errors = validateForm(formData);
  if (Object.values(errors).some((value) => value.length > 0)) {
    return errors;
  }

  formData.delete("repeatPassword");

  const result = await authService.registerUser(formData);
  switch (result.type) {
    case "success":
      return redirect("/");
    case "conflict":
      errors.other = "Username is already taken.";
      return errors;
  }
}

RegistrationPage.action = action;

export default function RegistrationPage() {
  const errors = useActionData() as RegistrationFormErrors | undefined;

  return (
    <div className="center-container">
      <Form
        replace
        method="post"
        className="auth-form"
      >
        <h1>Register</h1>
        {errors?.other && <span className="error-text">{errors.other}</span>}
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
        <FormInput
          type="password"
          name="repeatPassword"
          label="Repeat password"
          error={errors?.repeatPassword}
        />
        <FormInput
          type="text"
          name="firstName"
          label="First name"
          error={errors?.firstName}
        />
        <FormInput
          type="text"
          name="lastName"
          label="Last name"
          error={errors?.lastName}
        />
        <button type="submit">Submit</button>
      </Form>

      <Link to="/login">Log in</Link>
    </div>
  );
}
