import "./App.css";
import { AuthProvider } from "./App/Context/AuthContext";
import AppRouter from "./App/AppRouter";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from "@react-oauth/google";
function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <AuthProvider>
        <AppRouter />
        <ToastContainer position="top-center" style={{ zIndex: 9999 }} />
      </AuthProvider>
    </GoogleOAuthProvider>

  );
}

export default App;
