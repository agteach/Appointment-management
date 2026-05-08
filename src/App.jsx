import { useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import useAuthStore from "./store/authStore";

function App() {
  const token = useAuthStore((state) => state.token);
  const loadUser = useAuthStore((state) => state.loadUser);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return <div>{token ? <Dashboard /> : <Login />}</div>;
}

export default App;
