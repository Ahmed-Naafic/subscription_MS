import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  useRegisterMutation,
} from "../../features/auth/authApiSlice";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  const [register, { isLoading }] =
    useRegisterMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
      }).unwrap();

      navigate("/login");
    } catch (error) {
      alert(
        error?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <main className="grid min-h-screen place-items-center px-4 py-8">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <Link
          to="/"
          className="text-sm font-bold text-teal-700"
        >
          MERN Shop
        </Link>

        <h1 className="mt-4 text-3xl font-black text-slate-950">
          Create Account
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Create an account to start ordering.
        </p>

        <form
          onSubmit={submitHandler}
          className="mt-6 space-y-4"
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm"
            minLength="6"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-teal-700 disabled:bg-slate-300"
          >
            {isLoading
              ? "Creating..."
              : "Register"}
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-teal-700"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
