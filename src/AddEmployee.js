import React from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    contact: "",
    email: "",
    salary: ""
  });
  const navigate = useNavigate();

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

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem("employees")) || [];
    const newEmployee = { id: Date.now(), ...formData };
    localStorage.setItem("employees", JSON.stringify([...existing, newEmployee]));
    
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Add Employee</h1>
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
          Save Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;