import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { useAuthContext } from "./contexts/AuthContext.jsx";

import { Background } from "./components/ui/Background.jsx";
import Navbar from "./components/ui/Navbar.jsx";
import Settings from "./pages/Settings.jsx";
import Profile from "./pages/Profile.jsx";

const App = () => {
  const { authUser } = useAuthContext();
  return (
    <>
      <Background>
        {authUser ? <Navbar /> : null}
        <Routes>
          <Route
            path="/"
            element={!authUser ? <Navigate to={"/login"} /> : <Home />}
          />
          <Route
            path="/settings"
            element={!authUser ? <Navigate to={"/login"} /> : <Settings />}
          />
          <Route
            path="/profile"
            element={!authUser ? <Navigate to={"/login"} /> : <Profile />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to={"/"} /> : <Login />}
          />
          <Route
            path="/register"
            element={authUser ? <Navigate to={"/"} /> : <Register />}
          />

        </Routes>
      </Background>
    </>
  );
};

export default App;
