import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<Category />} />
        <Route path="not-found" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
