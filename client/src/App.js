import "./App.css";
import { AuthProvider } from "./App/Context/AuthContext";
import AppRouter from "./App/AppRouter";
function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
