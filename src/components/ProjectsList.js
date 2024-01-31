import React, { useEffect, useState } from "react";
import { Formik, Form, Field, useField } from "formik";
import { useGlobalContext } from "../store/context";
import { Link } from 'react-router-dom';
import ProjectNotFound from "./ProjectNotFound";
import "../css/ProjectsList.css";


function ProjectsList() {

  const { projects, employees, formatBudget, formatDate, filterProjects } = useGlobalContext();
  const [filteredProjects, setFilteredProjects] = useState([]);

  console.log(filteredProjects);

  const SelectMultiple = ({ label, ...props }) => {
    const [field, , helpers] = useField(props);
    return (
      <div>
        <label htmlFor={props.id || props.name}>{label}</label>
        <select {...field} {...props} multiple>
          {employees.map((employee) => (
            <option key={employee.employeeId} value={employee.employeeId}>
              {employee.FirstName} {employee.LastName}
            </option>
          ))}
        </select>
      </div>
    );
  }

  useEffect(() => {
    const updatedProjects = projects.map((project) => {
      return {
        ...project,
        engagedEmployees: project.engagedEmployees.map((emp) => {
          const employeeDetails = employees.find(
            (e) => e.employeeId === emp.employeeId
          );
          return {
            ...emp,
            ...employeeDetails,
          };
        }),
      };
    });

    setFilteredProjects(updatedProjects);
  }, [projects, employees]);

  return (
    <div className="projects-list">
      <div className="filter-panel">
        <Formik initialValues={{
            projectName: "",
            budgetFrom: "",
            budgetTo: "",
            employees: [],
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log("bitno: ", values)
            const filtered = filterProjects(values)
            setFilteredProjects(filtered);
            setSubmitting(false);
            }} >
          <Form>
            <label htmlFor="projectName">Project Name:</label>
            <Field type="text" name="projectName" placeholder="search by project name" />
            <label htmlFor="budgetFrom">Budget From:</label>
            <Field type="number" name="budgetFrom" placeholder="set starting price" />
            <label htmlFor="budgetTo">To:</label>
            <Field type="number" name="budgetTo" placeholder="set ending price" />

            <SelectMultiple label="Employees" name="employees" className="select-multiple-employees" />

            <button type="submit">Search</button>
            <button type="reset">Clear</button>
          </Form>
        </Formik>
      </div>
      <div className="project-display">
  {filteredProjects.length > 0 ? (
    filteredProjects.map((project) => (
      <div key={project.projectId} className="project-card">
        <h3>
          <Link to={`/project/${project.projectId}`}>{project.projectName}</Link>
        </h3>
        <p>Budget: {formatBudget(project.budget)}</p>
        <p>Start Date: {formatDate(project.startDate)}</p>
        <div className="engaged-employees">
          <h4>Engaged Employees:</h4>
          <p>Project Managers: {project.engagedEmployees.filter(emp => emp.role === 'Project Manager').length}</p>
          <p>Team Leads: {project.engagedEmployees.filter(emp => emp.role === 'Team Lead').length}</p>
          <p>Developers: {project.engagedEmployees.filter(emp => emp.role === 'Developer').length}</p>
          <p>Business Analysts: {project.engagedEmployees.filter(emp => emp.role === 'Business Analyst').length}</p>
        </div>
        
        <Link to={`/project/edit/${project.projectId}`}>
          <button>Edit</button>
        </Link>
      </div>
    ))
  ) : (
    <ProjectNotFound />
  )}
</div>

    </div>
  );
}

export default ProjectsList;
