import { useState } from "react";
import "./Login.css";

const Login = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    otp: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data for", selectedRole, formData);
  };

  return (
    <div className="login-container">
      <h1>Choose User Type</h1>

      <div className="button-group">
        {["Admin", "Principal", "Teacher", "Student"].map((role) => (
          <button
            key={role}
            className={`role-button ${selectedRole === role ? "selected" : ""}`}
            onClick={() => setSelectedRole(role)}
          >
            {role}
          </button>
        ))}
      </div>

      {selectedRole && (
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>{selectedRole} Login</h2>

          <label>Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label>Phone Number</label>
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label>OTP</label>
          <input
            name="otp"
            type="text"
            value={formData.otp}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;
