import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/register/Register";
import Home from "./components/Home/home";

function App() {
  return (
    <Router>
      <Routes>
        {/* Define the route for the Home component */}
        <Route path="/" element={<Home />} />
        {/* Define the route for the Register component */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
