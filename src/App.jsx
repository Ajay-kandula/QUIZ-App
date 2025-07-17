import React from "react";
import Login from "./Pages/Login";
import Quiz from "./Pages/quiz";
import Register from "./Pages/Register";
import Review from "./Pages/review";
import Scorepage from "./Pages/Score"; 
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to='/login' />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/scorepage" element={<Scorepage />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </Router>
  );
}

export default App;