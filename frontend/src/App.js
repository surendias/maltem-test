import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Cafes from "./pages/Cafes";
import Employees from "./pages/Employees";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import AddEditCafe from "./pages/AddEditCafe";
import AddEditEmployee from "./pages/AddEditEmployee";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cafes" element={<Cafes />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/add-edit-cafe" element={<AddEditCafe />} />
        <Route path="/add-edit-employee" element={<AddEditEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
