import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  logout,
} from "../../features/auth/authSlice";

function Navbar() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { userInfo } = useSelector(
    (state) => state.auth
  );

  const logoutHandler = () => {

    dispatch(logout());

    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        <Link
          to="/"
          className="text-xl font-black text-slate-950"
        >
          Subscription Management System
        </Link>

        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <Link
            to="/"
            className="rounded-md px-3 py-2 hover:bg-slate-100"
          >
            Home
          </Link>

          <Link
            to="/cart"
            className="rounded-md px-3 py-2 hover:bg-slate-100"
          >
            Customers
          </Link>

        {userInfo ? (
          <>

          {userInfo.role === "admin" && (
            <Link
              to="/admin"
              className="rounded-md px-3 py-2 hover:bg-slate-100"
            >
              Admin
            </Link>
          )}

          <Link
            to="/orders"
            className="rounded-md px-3 py-2 hover:bg-slate-100"
          >
            Subscription
          </Link>
             <Link
            to="/orders"
            className="rounded-md px-3 py-2 hover:bg-slate-100"
          >
            plans
          </Link>
             <Link
            to="/orders"
            className="rounded-md px-3 py-2 hover:bg-slate-100"
          >
            Payments
          </Link>
             <Link
            to="/orders"
            className="rounded-md px-3 py-2 hover:bg-slate-100"
          >
            Services
          </Link>

          <button
            type="button"
            onClick={logoutHandler}
            className="rounded-md bg-slate-950 px-3 py-2 text-white transition hover:bg-teal-700"
          >
            Logout
          </button>

          </>

        ) : (
          <>

          <Link
            to="/login"
            className="rounded-md px-3 py-2 hover:bg-slate-100"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-md bg-slate-950 px-3 py-2 text-white transition hover:bg-teal-700"
          >
            Register
          </Link>

          </>

        )}

        </div>
      </div>

    </nav>
  );
}

export default Navbar;
