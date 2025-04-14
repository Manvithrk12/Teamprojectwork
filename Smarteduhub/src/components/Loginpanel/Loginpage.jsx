import React from "react";
import { useNavigate } from "react-router-dom";
import './Loginpage.css'; // optional styling

const Loginpage = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h1>Select Your Role</h1>
      <button onClick={() => navigate("/admin")}>Admin</button>
      <button onClick={() => navigate("/principalpage")}>Principal</button>
      <button onClick={() => navigate("/teacherpage")}>Teacher</button>
      <button onClick={() => navigate("/studentpage")}>Student</button>
    </div>
  );
};

export default Loginpage;






