import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { FaBars, FaClipboardList, FaUserCheck, FaClipboard, FaEnvelopeOpenText, FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import "./Teacherpage.css";
import Edulogo from "../../assets/Smarteduhub.png";
import Teacherlogo from "../../assets/Teacherlogo.png";

const Teacherpage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const teacherMenuItems = [
    { name: "Dashboard", icon: <FaClipboardList />, path: "/teacherpage/dashboard" },
    { name: "Take Attendance", icon: <FaUserCheck />, path: "/teacherpage/attendance" },
    { name: "Assignments", icon: <FaClipboard />, path: "/teacherpage/assignments" },
    { name: "Requests", icon: <FaEnvelopeOpenText />, path: "/teacherpage/requests" },
  ];

  return (
    <div className="teacher-sidebar-container">
      <div className={`teacher-sidebar ${isOpen ? "open" : "closed"}`}>
        {/* Toggle Button */}
        <FaBars className="teacher-toggle-btn" onClick={toggleSidebar} />

        {/* Logo */}
        <div className="teacher-logo">
          <img src={Edulogo} alt="Logo" className={`teacher-logo-img ${isOpen ? "" : "hidden"}`} />
        </div>

        {/* Panel Logo */}
        <div className="teacher-panel-logo">
          <img src={Teacherlogo} alt="Teacher Logo" className={isOpen ? "" : "hidden"} />
          <h3 className={`teacher-panel-text ${isOpen ? "" : "hidden"}`}>Teacher Panel</h3>
        </div>

        {/* Sidebar Menu */}
        <ul className="teacher-menu">
          {teacherMenuItems.map((item, index) => (
            <li key={index} className={`teacher-menu-item ${location.pathname.startsWith(item.path) ? "active" : ""}`}>
              <Link to={item.path} className="teacher-menu-link">
                <span className="teacher-icon">{item.icon}</span>
                {isOpen && <span className="teacher-menu-text">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>

        {/* Bottom Menu */}
        <div className="teacher-bottom-menu">
          <Link to="/teacherpage/profile" className="teacher-menu-link teacher-profile-link">
            <FaUserCircle className="teacher-icon" />
            {isOpen && <span>Profile</span>}
          </Link>
          <button className="teacher-logout-btn" onClick={handleLogout}>
            <FiLogOut className="teacher-icon" />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content Render */}
      <div className="teacher-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Teacherpage;




