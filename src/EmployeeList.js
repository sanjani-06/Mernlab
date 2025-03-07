import React from "react";
import { Link, useNavigate } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployees] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const loadContacts = () => {
      const saved = JSON.parse(localStorage.getItem("employees")) || [];
      setEmployees(saved);
      setIsLoading(false);
    };
    
    loadContacts();
    window.addEventListener('storage', loadContacts);
    
    return () => {
      window.removeEventListener('storage', loadContacts);
    };
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container">
      {/* Header and Button Container */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1>Employees List</h1>
        <Link to="/add">
          <button className="submit-btn">Add New Employee</button>
        </Link>
      </div>

      <div className="table-container">
        <table className="post-list">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.contact}</td>
                <td>{employee.email}</td>
                <td>${employee.salary}</td>
                <td>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      className="icon-button edit"
                      onClick={() => navigate(`/edit/${employee.id}`)}
                    >
                      ✏️
                    </button>
                    <button 
                      className="icon-button delete"
                      onClick={() => handleDelete(employee.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;