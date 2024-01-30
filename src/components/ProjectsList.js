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

  // useEffect(() => {
  //   setFilteredProjects(projects);
  // }, [projects])

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

  const formatBudget = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return `${date.getDate()} ${date.toLocaleString("en-US", {
      month: "long",
    })}, ${date.getFullYear()}`;
  }

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
            console.log("ovo je iz formik: ", values);
            setSubmitting(false);
          }}
        >
          <Form>
            <label htmlFor="projectName">Project Name:</label>
            <Field
              type="text"
              name="projectName"
              placeholder="search by project name"
            />

            <label htmlFor="budgetFrom">Budget From:</label>
            <Field
              type="number"
              name="budgetFrom"
              placeholder="set starting price"
            />

            <label htmlFor="budgetTo">To:</label>
            <Field
              type="number"
              name="budgetTo"
              placeholder="set ending price"
            />

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
        {projects.map((project) => (
          <div key={project.projectId} className="project-card">
            <h3>{project.projectName}</h3>
            <p>Budget: {formatBudget(project.budget)}</p>
            <p>Start Date: {formatDate(project.startDate)}</p>
            <div className="engaged-employees">
              <h4>Engaged Employees:</h4>
              <ul>
                {project.engagedEmployees.map((emp) => {
                  const employeeDetails = employees.find(
                    (e) => e.employeeId == emp.employeeId
                  );
                  return (
                    <li key={emp.employeeId}>
                      {employeeDetails
                        ? `${employeeDetails.FirstName} ${employeeDetails.LastName} (${employeeDetails.Seniority}) - `
                        : "Unknown Employee - "}
                      {emp.role}, <br /> Start:{" "}
                      {new Date(emp.startDate).toLocaleDateString()},
                      <br /> Duration:{" "}
                      {emp.engagementDuration} months
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsList;
