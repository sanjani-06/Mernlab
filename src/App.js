import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EmployeeProvider } from "./EmployeeContext";
import EmployeeList from "./EmployeeList";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";

function App() {
  return (
    <EmployeeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/add" element={<AddEmployee />} />
          <Route path="/edit/:id" element={<EditEmployee />} />
        </Routes>
      </BrowserRouter>
    </EmployeeProvider>
  );
}

export default App;