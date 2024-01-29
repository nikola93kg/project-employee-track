import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";
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
    };

    const fetchEmployees = async () => {
      const response = await axios.get("/employees");
      setEmployees(response.data);
    };

    fetchProjects();
    fetchEmployees();
  }, []);

  const context = {
    projects: projects,
    employees: employees,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
