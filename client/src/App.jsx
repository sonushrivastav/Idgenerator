import Home from "./pages/Home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastifyProvider } from "./context/ToastifyContext.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import UserIdCard from "./components/userIdCard/UserIdCard.jsx";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <div className="w-full">
      <Router>
        <ToastifyProvider>
          <AuthProvider>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              /><Route
                path="/user-id"
                element={
                  <PrivateRoute>
                    <UserIdCard />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </AuthProvider>
        </ToastifyProvider>
      </Router>
    </div>
  );
};

export default App;
