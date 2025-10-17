// client/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import JobPostForm from './components/JobPostForm';
// We will create JobList.jsx later, but set up the link now
// import JobList from './components/JobList'; 

// Basic App.css is used for minimal styling/layout (optional)
import './App.css'; 

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Simple Navigation for quick access */}
        <nav>
          <Link to="/">Home</Link> | 
          <Link to="/resident/post">Post Job (Resident)</Link> |
          {/* CRITICAL: Placeholder for the next component */}
          <Link to="/help/jobs">View Jobs (House Help)</Link> 
        </nav>

        <hr/>
        
        <Routes>
          <Route path="/" element={<h2>MyComplex Helper MVP: Resident/House Help Connector</h2>} />
          
          {/* Route for the form you just created */}
          <Route 
            path="/resident/post" 
            element={<JobPostForm />} 
          />
          
          {/* Placeholder Route for the next feature (Job Discovery) */}
          <Route 
            path="/help/jobs" 
            element={<h2>Job Discovery Page - To be built next.</h2>} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
