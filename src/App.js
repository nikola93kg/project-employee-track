import React from "react";
import { Routes, Route } from 'react-router-dom';
import ProjectsList from './components/ProjectsList';
import ProjectForm from './components/ProjectForm';
import ProjectDetails from './components/ProjectDetails';
import "./css/App.css"
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="main">
    <Navbar />
    {/* dodaj conditional rendering za ovaj heading */}
    {/* <div className="heading"> 
      <h1>Project employees tracker</h1>
      <p>Get the latest information about projects and employees engaged on the project</p>
    </div> */}
      <Routes>
        <Route path="/" element={<ProjectsList />} />
        <Route path="/project/create" element={<ProjectForm />} />
        <Route path="/project/edit/:id" element={<ProjectForm />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </div>
  );
}

export default App;
