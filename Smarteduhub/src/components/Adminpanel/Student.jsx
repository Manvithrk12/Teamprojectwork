import { useState, useEffect } from "react";
import axios from "axios";
import "./User.css";
import { FaUserGraduate } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:5000/api/students";

const Student = () => {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");

  const [formData, setFormData] = useState({
    name: "",
    registerNumber: "",
    email: "",
    password: "",
    class: "BCA",
    phone: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      toast.error("Error fetching students");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
        toast.success("Student updated successfully!");
      } else {
        const response = await axios.post(API_URL, formData);
        setStudents([...students, response.data]);
        toast.success("Student added successfully!");
      }
      setFormData({ name: "", registerNumber: "", email: "", password: "", class: "BCA", phone: "" });
      setEditingId(null);
      setShowForm(false);
      fetchStudents();
    } catch (error) {
      toast.error("Error performing action");
    }
  };

  const handleEdit = (student) => {
    setFormData(student);
    setEditingId(student._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setStudents(students.filter((s) => s._id !== id));
      toast.success("Student deleted successfully!");
    } catch (error) {
      toast.error("Error deleting student");
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <h1>Student Management <FaUserGraduate /></h1>
  
      {/* Show these buttons only if not viewing table or form */}
      {!showForm && students.length === 0 && (
        <div className="button-group">
          <button onClick={() => { setShowForm(true); setEditingId(null); }}>Add Student</button>
          <button onClick={() => fetchStudents()}>View Data</button>
        </div>
      )}
  
      {/* Show Back button only when form is hidden and table is shown */}
      {!showForm && students.length > 0 && (
        
          <button onClick={() => {
            setStudents([]);
            setSearchTerm("");
            setSelectedClass("All");
          }} className="Back">Back</button>
      
      )}
  
      {/* Filter input and class dropdown when showing table */}
      {!showForm && students.length > 0 && (
        <div className="filter-section">
          <input
            type="text"
            placeholder="Search by name, reg no, or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            <option value="All">All</option>
            <option value="BBA">BBA</option>
            <option value="BCA">BCA</option>
          </select>
        </div>
      )}
  
      {/* Form */}
      {showForm && (
        <form className="User-form" onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          <label>Register Number:</label>
          <input type="text" name="registerNumber" value={formData.registerNumber} onChange={handleChange} required />
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          <label>Class:</label>
          <select name="class" value={formData.class} onChange={handleChange}>
            <option value="BBA">BBA</option>
            <option value="BCA">BCA</option>
          </select>
          <label>Phone Number:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          <button type="submit">{editingId ? "Update" : "Submit"}</button>
          <button type="button" onClick={() => setShowForm(false)}>Back</button>
        </form>
      )}
  
      {/* Table */}
      {!showForm && students.length > 0 && (
        <div className="table-frame">
          <table className="User-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Register Number</th>
                <th>Email</th>
                <th>Class</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students
                .filter((student) => {
                  const matchSearch =
                    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    student.registerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    student.email.toLowerCase().includes(searchTerm.toLowerCase());
                  const matchClass =
                    selectedClass === "All" || student.class === selectedClass;
                  return matchSearch && matchClass;
                })
                .map((student) => (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.registerNumber}</td>
                    <td>{student.email}</td>
                    <td>{student.class}</td>
                    <td>{student.phone}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(student)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(student._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
  
};

export default Student;


