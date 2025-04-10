import { useState } from "react";
import { FaBars, FaBookOpen, FaClipboardList, FaComments, FaCalendarAlt, FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import "./Studentpage.css";
import Edulogo from "../../assets/Smarteduhub.png";
// import StudentLogo from "../../assets/studentlogo.png"; // replace with actual student logo

const StudentSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: "View Attendance", icon: <FaClipboardList />, path: "/student/attendance" },
    { name: "Assignments", icon: <FaBookOpen />, path: "/student/assignments" },
    { name: "Sessions", icon: <FaCalendarAlt />, path: "/student/sessions" },
    { name: "Feedback", icon: <FaComments />, path: "/student/feedback" },
  ];

  return (
    <div className="student-sidebar-container">
      <div className={`student-sidebar ${isOpen ? "open" : "closed"}`}>
        
        {/* Toggle Button */}
        <FaBars className="student-toggle-btn" onClick={toggleSidebar} />

        {/* Logo */}
        <div className="student-logo">
          <img src={Edulogo} alt="Logo" className={`student-logo-img ${isOpen ? "" : "hidden"}`} />
        </div>

        {/* Student Panel Logo */}
        <div className="student-panel-logo">
          <img src={StudentLogo} alt="Student" className={isOpen ? "" : "hidden"} />
          <h3 className={`student-panel-text ${isOpen ? "" : "hidden"}`}>Student Panel</h3>
        </div>

        {/* Menu Items */}
        <ul className="student-menu">
          {menuItems.map((item, index) => (
            <li key={index} className={`student-menu-item ${location.pathname === item.path ? "active" : ""}`}>
              <Link to={item.path} className="student-menu-link">
                <span className="student-icon">{item.icon}</span>
                {isOpen && <span className="student-menu-text">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>

        {/* Bottom Section */}
        <div className="student-bottom-actions">
          <Link to="/student/profile" className="student-bottom-link">
            <FaUserCircle />
            {isOpen && <span>Profile</span>}
          </Link>
          <button className="student-logout-btn">
            <FiLogOut />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentSidebar;
