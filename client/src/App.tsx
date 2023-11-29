import { BrowserRouter, Routes, Route, Outlet, useNavigate } from "react-router-dom";
import Home from "./assets/pages/Home/Home";
import Register from "./assets/pages/Register/Register";
import Login from "./assets/pages/Login/Login";
import MemGame from "./assets/pages/MemGame/MemGame";
import NotFound from "./assets/pages/NotFound/NotFound";
import Dashboard from "./assets/pages/Dashboard/Dashboard";
import Settings from "./assets/pages/Settings/Settings";
import Create from "./assets/pages/Create/Create";
import Games from "./assets/pages/Games/Games";
import { useState, useEffect } from "react";
import { UserType } from "./assets/types/UserType";

const ProtectedRoute = () => {
  const [user, setUser] = useState<UserType | null>();
  const navigate = useNavigate();

  useEffect(() => {
    const initUser = async () => {
      const userString = sessionStorage.getItem("user");

      if (userString) {
        const parsedUser = JSON.parse(userString);
        setUser(parsedUser);
      } else {
        setUser(null);
        navigate("/", { replace: true });
      }
    };

    initUser();
  }, [navigate]);

  if (user !== null) {
    return <Outlet />;
  }

  return null;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route element={<ProtectedRoute />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/create' element={<Create />} />
                    <Route path='/games' element={<Games />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path='/memory' element={<MemGame />} />
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;