import { useState } from "react";
import {
  FaBars,
  FaChalkboardTeacher,
  FaUserTie,
  FaUserGraduate,
  FaBell,
  FaTachometerAlt
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Link, useLocation, Outlet } from "react-router-dom"; // ⬅️ Include Outlet
import "./Admin.css";
import Edulogo from "../../assets/Smarteduhub.png";
import Adminlogo from "../../assets/Adminlogo.png";

const Admin = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin/dashboard" },
    { name: "Principal", icon: <FaUserTie />, path: "/admin/principal" },
    { name: "Teacher", icon: <FaChalkboardTeacher />, path: "/admin/teacher" },
    { name: "Student", icon: <FaUserGraduate />, path: "/admin/student" },
    { name: "Notice", icon: <FaBell />, path: "/admin/notice" },
  ];

  return (
    <div className="admin-panel-container">
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <FaBars className="toggle-btn" onClick={toggleSidebar} />

        <div className="logo">
          <img src={Edulogo} alt="Logo" className={`logo-img ${isOpen ? "" : "hidden"}`} />
        </div>

        <div className="admin-logo">
          <img src={Adminlogo} alt="Adminlogo" className={isOpen ? "" : "hidden"} />
          <h3 className={`admin-text ${isOpen ? "" : "hidden"}`}>Admin Panel</h3>
        </div>

        <ul className="menu">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`menu-item ${location.pathname === item.path ? "active" : ""}`}
            >
              <Link to={item.path} className="menu-link">
                <span className="icon">{item.icon}</span>
                {isOpen && <span className="menu-text">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>

        <div className="logout">
          <button className="logout-btn">
            <FiLogOut className="icon" />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Nested route content here */}
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;



