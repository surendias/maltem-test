import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Cafes from "./pages/Cafes";
import Employees from "./pages/Employees";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cafes" element={<Cafes />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </Router>
  );
}

export default App;
