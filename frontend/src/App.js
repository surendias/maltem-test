import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Cafes from "./pages/Cafes";
import Employees from "./pages/Employees";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Cafes />} />
        <Route path="/cafes" element={<Cafes />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </Router>
  );
}

export default App;
