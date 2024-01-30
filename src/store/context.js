import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import mockProjectsData from "../assets/mocked-data/projects.json";
import mockEmployeesData from "../assets/mocked-data/employees.json";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const mock = new MockAdapter(axios);

  useEffect(() => {
    mock.onGet("/projects").reply(200, mockProjectsData);
    mock.onGet("/employees").reply(200, mockEmployeesData);

    const fetchProjects = async () => {
      const response = await axios.get("/projects");
      setProjects(response.data);
    }

    const fetchEmployees = async () => {
      const response = await axios.get("/employees");
      setEmployees(response.data);
    }

    fetchProjects();
    fetchEmployees();
  }, []);


  const saveProject = (projectData, projectId) => {
    setProjects((prevProjects) => {
      let updatedProjects = [...prevProjects];
  
      if (projectId) {
        updatedProjects = updatedProjects.map((project) => {
          if (project.projectId === projectId) {
            return { ...project, ...projectData }
          }
          return project;
        });
      } else {
        const newProject = {
          projectId: `P${Math.floor(Math.random() * 10000)}`,
          projectName: projectData.projectName,
          budget: projectData.budget,
          startDate: projectData.startDate,
          engagedEmployees: projectData.engagedEmployees
        }
        updatedProjects.push(newProject);
      }
  
      return updatedProjects;
    });
  }
  

  const context = {
    projects: projects,
    employees: employees,
    saveProject: saveProject,
  }

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppContext, AppProvider }
