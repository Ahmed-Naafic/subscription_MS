import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/layout/Navbar";

import Home from "./pages/public/home";


import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";



import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

function App() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div>

      {!hideNavbar && <Navbar />}

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route element={<ProtectedRoute />}>

        

        

        

        </Route>

        <Route element={<AdminRoute />}>

      

        </Route>

      </Routes>

    </div>
  );
}

export default App;
