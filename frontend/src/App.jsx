import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePages/HomePage";
import PhotoPage from "./pages/HomePages/PhotoPage";
import Category from "./pages/Category";
import LoginPage from "./pages/User-Pages/LoginPage";
import SignUpPage from "./pages/User-Pages/SignupPage";
import PlanetsPage from "./pages/Solar-System/Planets-page/PlanetsPage";
import IndividualPlanetPage from "./pages/Solar-System/Planets-page/Individual-planet/IndividualPlanetPage";
import Dashboard from "./pages/User-Pages/Dashboard";
import Community from "./pages/Community";
import ArticlePage from "./pages/ArticlePage/";
// import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Community/" element={<Community />} />
        <Route path="Photos/:photoName/" element={<PhotoPage />} />
        <Route path=":categoryName/" element={<Category />} />
        <Route path=":categoryName/:subCategory/" element={<ArticlePage />} />
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
