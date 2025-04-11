import { useState, useEffect } from "react";
import axios from "axios";
import "./User.css";
import { FaChalkboardTeacher } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Teacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [viewMode, setViewMode] = useState(false); // New state

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    class: "BCA",
    phone: "",
    subject: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/teachers");
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      toast.error("Failed to fetch teachers");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTeacher) {
        await axios.put(`http://localhost:5000/api/teachers/${editingTeacher._id}`, formData);
        toast.success("Teacher updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/teachers", formData);
        toast.success("Teacher added successfully");
      }
      setShowForm(false);
      setViewMode(true); // Switch to view mode
      setEditingTeacher(null);
      setFormData({ name: "", email: "", password: "", class: "BCA", phone: "", subject: "" });
      fetchTeachers();
    } catch (error) {
      console.error("Error submitting teacher data:", error);
      toast.error("Error submitting teacher data");
    }
  };

  const handleEdit = (teacher) => {
    setFormData({
      ...teacher,
      class: teacher.class || teacher.className,
    });
    setEditingTeacher(teacher);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/teachers/${id}`);
      fetchTeachers();
      toast.success("Teacher deleted successfully");
    } catch (error) {
      console.error("Error deleting teacher:", error);
      toast.error("Error deleting teacher");
    }
  };

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch = (
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesClass = (
      selectedClass === "All" || teacher.class === selectedClass || teacher.className === selectedClass
    );
    return matchesSearch && matchesClass;
  });

  return (
    <div className="container">
      <ToastContainer />
      <h1>Teacher Management <FaChalkboardTeacher /></h1>

      <div className="button-group">
        {!viewMode && (
          <>
            <button onClick={() => { setShowForm(true); setEditingTeacher(null); }}>
              Add Teacher
            </button>
            <button onClick={() => { setShowForm(false); setViewMode(true); }}>
              View Data
            </button>
          </>
        )}
        
      </div>
      {viewMode && (
          <button onClick={() => { setShowForm(false); setViewMode(false); }} className="Back">
            Back
          </button>
        )}

      {showForm && (
        <form className="User-form" onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />

          <label>Class:</label>
          <select name="class" value={formData.class} onChange={handleChange}>
            <option value="BBA">BBA</option>
            <option value="BCA">BCA</option>
            <option value="BCA & BBA">BCA & BBA</option>
          </select>

          <label>Phone Number:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

          <label>Subject:</label>
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />

          <button type="submit">{editingTeacher ? "Update" : "Submit"}</button>
        </form>
      )}

      {!showForm && viewMode && (
        <div className="frame">
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, email, or subject"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className="search-input"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="All">All</option>
            <option value="BCA">BCA</option>
            <option value="BBA">BBA</option>
            <option value="BCA & BBA">BCA & BBA</option>
          </select>

          {filteredTeachers.length > 0 ? (
            <div className="frame">
              <table className="User-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Class</th>
                    <th>Phone</th>
                    <th>Subject</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher._id}>
                      <td>{teacher.name}</td>
                      <td>{teacher.email}</td>
                      <td>{teacher.class || teacher.className}</td>
                      <td>{teacher.phone}</td>
                      <td>{teacher.subject}</td>
                      <td>
                        <button className="edit-btn" onClick={() => handleEdit(teacher)}>Edit</button>
                        <button className="delete-btn" onClick={() => handleDelete(teacher._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="frame">
              <p>No teacher data available.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Teacher;




