import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Login Page
import Login from "./Components/Loginpanel/Loginpage";

// Admin Section
import Admin from "./Components/Adminpanel/Admin";
import Dashboard from "./Components/Adminpanel/Dashboard";
import Principal from "./Components/Adminpanel/Principal";
import Teacher from "./Components/Adminpanel/Teacher";
import Student from "./Components/Adminpanel/Student";
import Notice from "./Components/Adminpanel/Notice";

// Principal, Teacher, Student Full Pages
import PrincipalPage from "./Components/Principalpanel/Principalpage";
import TeacherPage from "./Components/Teacherpanel/Teacherpage";
import StudentPage from "./Components/Studentpanel/Studentpage";

// Teacher Sub Pages
import TDashboard from "./Components/Teacherpanel/TDashboard";
import TAttendence from "./Components/Teacherpanel/TAttendence";
import TAssignment from "./Components/Teacherpanel/TAssignment";
import TRequests from "./Components/Teacherpanel/TRequests";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Role Selection Page */}
        <Route path="/" element={<Login />} />

        {/* Admin Dashboard Pages with Sidebar */}
        <Route
          path="/admin/*"
          element={
            <div className="app-container">
              <Admin />
              <div className="content">
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="principal" element={<Principal />} />
                  <Route path="teacher" element={<Teacher />} />
                  <Route path="student" element={<Student />} />
                  <Route path="notice" element={<Notice />} />
                </Routes>
              </div>
            </div>
          }
        />

        {/* Principal and Student Pages */}
        <Route path="/principalpage" element={<PrincipalPage />} />
        <Route path="/studentpage" element={<StudentPage />} />

        {/* Teacher Page with Nested Routes */}
        <Route path="/teacherpage/*" element={<TeacherPage />}>

          <Route path="dashboard" element={<TDashboard />} />
          <Route path="attendance" element={<TAttendence />} />
          <Route path="assignments" element={<TAssignment />} />
          <Route path="requests" element={<TRequests />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;





