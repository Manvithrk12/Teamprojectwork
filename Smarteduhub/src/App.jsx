import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./components/Adminpanel/Admin";
import Dashboard from "./components/Adminpanel/Dashboard";
import Principal from "./components/Adminpanel/Principal";
import Teacher from "./components/Adminpanel/Teacher";
import Student from "./components/Adminpanel/Student";
import Notice from "./components/Adminpanel/Notice";

// Import the StudentPage layout
import StudentPage from "./components/Studentpanel/StudentPage";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Admin />
        <div className="content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/principal" element={<Principal />} />
            <Route path="/teacher" element={<Teacher />} />
            <Route path="/student" element={<Student />} />
            <Route path="/notice" element={<Notice />} />

            {/* Student Panel Layout with nested routes */}
            <Route path="/student/*" element={<StudentPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

