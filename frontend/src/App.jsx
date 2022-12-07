import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import HomePage from "./pages/HomePage";
import Category from "./pages/Category";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
// import Footer from "./components/Footer/Footer";
import PlanetsPage from "./pages/Solar-System/PlanetsPage";
import SunPage from "./pages/Solar-System/SunPage";

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
        <Route path="/:categoryName/" element={<Category />} />
        <Route path="/login/" element={<LoginPage />} />
        <Route path="/signup/" element={<SignUpPage />} />
        <Route path="/Planets/" element={<PlanetsPage />} />
        <Route path="/Sun/" element={<SunPage props={data} />} />
        <Route path="/Black Holes/" element={<SunPage />} />
        <Route path="/Supernovas/" element={<SunPage />} />
        <Route path="/Nebulas/" element={<SunPage />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
