import { useState } from "react";
import { FaBars, FaChalkboardTeacher, FaUserTie, FaUserGraduate, FaBell, FaTachometerAlt } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
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
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { name: "Principal", icon: <FaUserTie />, path: "/principal" },
    { name: "Teacher", icon: <FaChalkboardTeacher />, path: "/teacher" },
    { name: "Student", icon: <FaUserGraduate />, path: "/student" },
    { name: "Notice", icon: <FaBell />, path: "/notice" },
  ];

  return (
    <div className="sidebar-container">
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        {/* Toggle Button */}
        <FaBars className="toggle-btn" onClick={toggleSidebar} />

        {/* Logo */}
        <div className="logo">
          <img src={Edulogo} alt="Logo" className={`logo-img ${isOpen ? "" : "hidden"}`} />
        </div>

        {/* Admin Panel Logo */}
        <div className="admin-logo">
          <img src={Adminlogo} alt="Adminlogo" className={isOpen ? "" : "hidden"} />
          <h3 className={`admin-text ${isOpen ? "" : "hidden"}`}>Admin Panel</h3>
        </div>

        {/* Menu Items */}
        <ul className="menu">
          {menuItems.map((item, index) => (
            <li key={index} className={`menu-item ${location.pathname === item.path ? "active" : ""}`}>
              <Link to={item.path} className="menu-link">
                <span className="icon">{item.icon}</span>
                {isOpen && <span className="menu-text">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout Button */}
        <div className="logout">
          <button className="logout-btn">
            <FiLogOut className="icon" />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;


