import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Category from "./pages/Category";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:categoryName/" element={<Category />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
