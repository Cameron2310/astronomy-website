import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import HomePage from "./pages/HomePage";
import Category from "./pages/Category";
import LoginPage from "./pages/User-Pages/LoginPage";
import SignUpPage from "./pages/User-Pages/SignupPage";
import PlanetsPage from "./pages/Solar-System/Planets-page/PlanetsPage";
import IndividualPlanetPage from "./pages/Solar-System/Planets-page/Individual-planet/IndividualPlanetPage";
import SunPage from "./pages/Solar-System/SunPage";
import Dashboard from "./pages/User-Pages/Dashboard";
// import Footer from "./components/Footer/Footer";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      const response = await axios("http://localhost:8000/data/");
      setData(response.data);
    };
    getData();
  }, []);

  if (!data) return null;
  return (
    <Router className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path=":categoryName/" element={<Category />} />
        <Route path=":categoryName/:subCategory/" element={<SunPage />} />
        <Route path=":categoryName/Planets/" element={<PlanetsPage />} />
        <Route
          path=":categoryName/:subCategory/:topicName/"
          element={<IndividualPlanetPage />}
        />
        <Route path="/login/" element={<LoginPage />} />
        <Route path="/signup/" element={<SignUpPage />} />
        <Route path="/dashboard/:userId/" element={<Dashboard />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
