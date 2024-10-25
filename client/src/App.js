import "./App.css";
import { AuthProvider } from "./App/Context/AuthContext";
import AppRouter from "./App/AppRouter";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <AuthProvider>
      <AppRouter />
      <ToastContainer />
    </AuthProvider>
    
  );
}

export default App;
