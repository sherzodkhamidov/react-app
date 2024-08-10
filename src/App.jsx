import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DocumentPreview from './pages/Preview';
import './App.css';
import CreateDocument from './pages/Create';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/preview/:id" element={<DocumentPreview />} />
        <Route path="/create" element={<CreateDocument />} /> 
      </Routes>
    </Router>
  );
}

export default App;
