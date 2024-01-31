import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { useGlobalContext } from "../store/context";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import * as Yup from "yup";
import "../css/ProjectForm.css";

function ProjectForm() {

  const navigate = useNavigate();
  const { projects, createAndUpdateProject, employees } = useGlobalContext();
  const { projectId } = useParams();
  const [initialValues, setInitialValues] = useState({
    projectName: "",
    budget: "",
    startDate: "",
    engagedEmployees: [
      { employeeId: "", role: "", startDate: "", engagementDuration: "" },
    ],
  });

  useEffect(() => {
    if (projectId) {
      const existingProject = projects.find((p) => p.projectId === projectId);
      if (existingProject) {
        setInitialValues({
          projectName: existingProject.projectName,
          budget: existingProject.budget,
          startDate: existingProject.startDate,
          engagedEmployees: existingProject.engagedEmployees,
        });
      }
    }
  }, [projectId, projects]);
  

  const projectValidationSchema = Yup.object().shape({
    projectName: Yup.string()
      .required("Project Name is required")
      .min(3, "Project Name must be at least 3 characters long"),
    budget: Yup.number()
      .required("Budget is required")
      .positive("Budget must be a positive number"),
    startDate: Yup.date()
      .required("Start Date is required")
      .min(new Date(), "Start Date cannot be in the past"),
    engagedEmployees: Yup.array().of(
      Yup.object().shape({
        employeeId: Yup.number().required("Employee selection is required"),
        role: Yup.string()
          .required("Role is required")
          .test(
            "is-senior",
            "Only seniors can have a Project Manager or Team Lead role",
            function (value) {
              const { employeeId } = this.parent;
              const employee = employees.find(
                (e) => e.employeeId === employeeId
              );
              if (value === "Project Manager" || value === "Team Lead") {
                return employee && employee.Seniority === "Senior";
              }
              return true;
            }
          ),
        startDate: Yup.date()
          .required("Start Date is required")
          .min(
            Yup.ref("startDate"),
            "Employee start date cannot be before project start date"
          ),
        engagementDuration: Yup.number()
          .required("Engagement Duration is required")
          .positive("Engagement Duration must be a positive number"),
      })
    ),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Project data:", values);
    createAndUpdateProject(values, projectId);
    setSubmitting(false);
    navigate("/");
  }

  return (
    <div className="project-container">
      <div className="image-content"></div>
      <div className="project-form">
        <h2>{projectId ? "Update Project" : "Create Project"}</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={projectValidationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          <Form>
            <label htmlFor="projectName">Project Name:</label>
            <Field type="text" name="projectName" />
            <ErrorMessage
              name="projectName"
              component="div"
              className="error-message"
            />

            <label htmlFor="budget">Budget:</label>
            <Field type="number" name="budget" />
            <ErrorMessage
              name="budget"
              component="div"
              className="error-message"
            />

            <label htmlFor="startDate">Start Date:</label>
            <Field type="date" name="startDate" />
            <ErrorMessage
              name="startDate"
              component="div"
              className="error-message"
            />

            <label htmlFor="engagedEmployees">Engaged Employees:</label>

            <FieldArray name="engagedEmployees">
              {({ insert, remove, push, form }) => (
                <div>
                  {form.values.engagedEmployees.map((employee, index) => (
                    <div key={employee.employeeId}>
                      <Field name={`engagedEmployees.${index}.employeeId`} as="select">
                        {employees.map((emp) => (
                          <option key={emp.employeeId} value={emp.employeeId}>
                            {emp.FirstName} {emp.LastName}: {emp.Seniority}
                          </option>
                        ))}
                      </Field>
                      <Field name={`engagedEmployees.${index}.role`} as="select">
                        <option value="">Select Role on the project</option>
                        <option value="Project Manager">Project Manager</option>
                        <option value="Team Lead">Team Lead</option>
                        <option value="Developer">Developer</option>
                        <option value="Business Analyst">
                          Business Analyst
                        </option>
                      </Field>
                      <label htmlFor={`engagedEmployees.${index}.startDate`}>
                        Start Date:
                      </label>
                      <Field type="date" name={`engagedEmployees.${index}.startDate`} />
                      <Field
                        type="number"
                        name={`engagedEmployees.${index}.engagementDuration`}
                        placeholder="set engagement duration in months"
                      />
                      <ErrorMessage
                        name={`engagedEmployees.${index}.employeeId`}
                        component="div"
                        className="error-message"
                      />
                      <ErrorMessage
                        name={`engagedEmployees.${index}.role`}
                        component="div"
                        className="error-message"
                      />
                      <ErrorMessage
                        name={`engagedEmployees.${index}.startDate`}
                        component="div"
                        className="error-message"
                      />
                      <ErrorMessage
                        name={`engagedEmployees.${index}.engagementDuration`}
                        component="div"
                        className="error-message"
                      />
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      push({
                        employeeId: "",
                        role: "",
                        startDate: "",
                        engagementDuration: "",
                      })
                    }
                  >
                    Add Employee
                  </button>
                </div>
              )}
            </FieldArray>

            <button type="submit">{projectId ? "Update" : "Create"}</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default ProjectForm;