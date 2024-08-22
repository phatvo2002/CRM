import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { red } from "@mui/material/colors";
const UserProfile = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      UserProfile
      <button style={{ background: red }} onClick={logout}>
        Đăng xuất{" "}
      </button>
    </div>
  );
};

export default UserProfile;
