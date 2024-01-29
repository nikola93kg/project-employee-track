import React, { useEffect, useState } from "react";
import { Formik, Form, Field, useField } from "formik";
import { useGlobalContext } from "../store/context";
import "../css/ProjectsList.css";

function ProjectsList() {
  const { projects, employees } = useGlobalContext();
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
  };

  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]); 

  return (
    <div className="projects-list">
      <div className="filter-panel">
        <Formik
          initialValues={{
            projectName: "",
            budgetFrom: "",
            budgetTo: "",
            employees: [],
          }}
          onSubmit={(values, { setSubmitting }) => {
            
            console.log('ovo je iz formik: ', values);
            setSubmitting(false);
          }}
        >
          <Form>
            <label htmlFor="projectName">Project Name:</label>
            <Field type="text" name="projectName" />

            <label htmlFor="budgetFrom">Budget From:</label>
            <Field type="number" name="budgetFrom" />

            <label htmlFor="budgetTo">To:</label>
            <Field type="number" name="budgetTo" />

            <SelectMultiple
              label="Employees"
              name="employees"
              className="select-multiple-employees"
            />

            <button type="submit">Search</button>
          </Form>
        </Formik>
      </div>
      <div className="project-display">
        {filteredProjects.map((project) => (
          <div key={project.projectId} className="project-card">
            <h3>{project.projectName}</h3>
            <p>Budget: {project.budget}</p>
            <p>
              Start Date: {new Date(project.startDate).toLocaleDateString()}
            </p>
            <div className="engaged-employees">
              <h4>Engaged Employees:</h4>
              <ul>
                {project.engagedEmployees.map((emp) => (
                  <li key={emp.employeeId}>
                    {emp.FirstName} {emp.LastName} - {emp.role}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsList;
