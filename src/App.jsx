import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { EmployeeProvider } from "./contexts/EmployeeContext";
import Index from "./pages/Index.jsx";
import EmployeeDetails from "./pages/EmployeeDetails.jsx";
import Favorites from "./pages/Favorites.jsx";

function App() {
  return (
    <Router>
      <EmployeeProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/details/:uuid" element={<EmployeeDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </EmployeeProvider>
    </Router>
  );
}

export default App;
