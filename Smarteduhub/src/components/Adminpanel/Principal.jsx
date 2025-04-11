import { useState, useEffect } from "react";
import axios from "axios";
import "./User.css";
import { FaUserTie } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Principal = () => {
  const [principals, setPrincipals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  // Fetch principals from backend
  useEffect(() => {
    fetchPrincipals();
  }, []);

  const fetchPrincipals = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/principals");
      setPrincipals(res.data);
    } catch (error) {
      toast.error("Failed to fetch data");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Update existing principal
        await axios.put(`http://localhost:5000/api/principals/${editingId}`, formData);
        toast.success("Principal updated successfully!");
      } else {
        // Add new principal
        const res = await axios.post("http://localhost:5000/api/principals", formData);
        setPrincipals([...principals, res.data]);
        toast.success("Principal added successfully!");
      }

      setFormData({ name: "", email: "", phone: "", password: "" });
      setShowForm(false);
      setEditingId(null);
      fetchPrincipals(); // Refresh data
    } catch (error) {
      toast.error("Error performing action");
      console.error(error);
    }
  };

  const handleEdit = (principal) => {
    setFormData(principal);
    setEditingId(principal._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/principals/${id}`);
      setPrincipals(principals.filter(principal => principal._id !== id));
      toast.success("Principal deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete principal");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <h1>Principal Management <FaUserTie /></h1>

      <div className="button-group">
        <button onClick={() => { setShowForm(true); setEditingId(null); }}>Add Principal</button>
        <button onClick={() => setShowForm(false)}>View Data</button>
      </div>

      {showForm && (
        <form className="User-form" onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Phone Number:</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />

          <button type="submit">{editingId ? "Update" : "Submit"}</button>
        </form>
      )}

      {!showForm && principals.length > 0 && (
        <div className="table-container">
          <table className="User-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {principals.map((principal) => (
                <tr key={principal._id}>
                  <td>{principal.name}</td>
                  <td>{principal.email}</td>
                  <td>{principal.phone}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(principal)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(principal._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!showForm && principals.length === 0 && <p>No principal data available.</p>}
    </div>
  );
};

export default Principal;
