import "./App.css";
import { AuthProvider } from "./App/Context/AuthContext";
import AppRouter from "./App/AppRouter";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleOAuthProvider } from "@react-oauth/google";
function App() {
  return (
    <GoogleOAuthProvider clientId={"654243851037-v101h8jc241279mknctkvsc5ehe3st05.apps.googleusercontent.com"}>
      <AuthProvider>
        <AppRouter />
        <ToastContainer position="top-center" style={{ zIndex: 9999 }} />
      </AuthProvider>
    </GoogleOAuthProvider>

  );
}

export default App;
