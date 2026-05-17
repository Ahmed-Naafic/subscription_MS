import { useState } from "react";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import {
  useLoginMutation,
} from "../../features/auth/authApiSlice";

import {
  setCredentials,
} from "../../features/auth/authSlice";

function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [login, { isLoading }] =
    useLoginMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {

      const response = await login({
        email: email.trim(),
        password,
      }).unwrap();

      if (!response?.token || !response?.user) {
        throw new Error(
          "Login response is missing user data"
        );
      }

      dispatch(setCredentials({
        ...response.user,
        token: response.token,
      }));

      navigate("/");

      alert("Login successful");

    } catch (error) {

      console.log(error);

      alert(
        error?.data?.message ||
        error?.message ||
        "Login failed"
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
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Log in to manage your cart and orders.
        </p>

      <form
        onSubmit={submitHandler}
        className="mt-6 space-y-4"
      >

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm"
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-teal-700 disabled:bg-slate-300"
        >
          {isLoading
            ? "Loading..."
            : "Login"}
        </button>

      </form>

        <p className="mt-5 text-sm text-slate-600">
          Need an account?{" "}
          <Link
            to="/register"
            className="font-bold text-teal-700"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
