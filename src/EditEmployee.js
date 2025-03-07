import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: "",
    contact: "",
    email: "",
    salary: ""
  });

  React.useEffect(() => {
    const existing = JSON.parse(localStorage.getItem("employees")) || [];
    const current = existing.find(emp => emp.id === parseInt(id));
    if (current) setFormData(current);
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.contact || !formData.email || !formData.salary) {
      alert("All fields required");
      return;
    }

    // Update in localStorage
    const existing = JSON.parse(localStorage.getItem("employees")) || [];
    const updated = existing.map(emp => 
      emp.id === parseInt(id) ? formData : emp
    );
    localStorage.setItem("employees", JSON.stringify(updated));
    
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Edit Employee</h1>
      <form onSubmit={handleSubmit} className="input-container">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contact:</label>
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Salary:</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;