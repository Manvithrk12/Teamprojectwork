import { useState } from "react";
import {
  FaBars,
  FaTachometerAlt,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaClipboardList,
  FaUserCircle,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import "./Principalpage.css";
import Edulogo from "../../assets/Smarteduhub.png";
import Principallogo from "../../assets/PrincipalLogo.png";

const Principalpage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const principalMenuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/principal/dashboard" },
    { name: "Manage Teachers", icon: <FaChalkboardTeacher />, path: "/principal/teachers" },
    { name: "Manage Students", icon: <FaUserGraduate />, path: "/principal/students" },
    { name: "Reports", icon: <FaClipboardList />, path: "/principal/reports" },
  ];

  return (
    <div className="principal-sidebar-container">
      <div className={`principal-sidebar ${isOpen ? "open" : "closed"}`}>
        {/* Toggle Button */}
        <FaBars className="principal-toggle-btn" onClick={toggleSidebar} />

        {/* Logo */}
        <div className="principal-logo">
          <img src={Edulogo} alt="Logo" className={`principal-logo-img ${isOpen ? "" : "hidden"}`} />
        </div>

        {/* Panel Logo */}
        <div className="principal-panel-logo">
          <img src={Principallogo} alt="Principal Logo" className={isOpen ? "" : "hidden"} />
          <h3 className={`principal-panel-text ${isOpen ? "" : "hidden"}`}>Principal Panel</h3>
        </div>

        {/* Menu Items */}
        <ul className="principal-menu">
          {principalMenuItems.map((item, index) => (
            <li key={index} className={`principal-menu-item ${location.pathname === item.path ? "active" : ""}`}>
              <Link to={item.path} className="principal-menu-link">
                <span className="principal-icon">{item.icon}</span>
                {isOpen && <span className="principal-menu-text">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>

        {/* Bottom Menu */}
        <div className="principal-bottom-menu">
          <Link to="/principal/profile" className="principal-menu-link principal-profile-link">
            <FaUserCircle className="principal-icon" />
            {isOpen && <span>Profile</span>}
          </Link>
          <button className="principal-logout-btn">
            <FiLogOut className="principal-icon" />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Principalpage;

