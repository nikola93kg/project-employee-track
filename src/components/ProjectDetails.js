import React from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from '../store/context';
import ProjectNotFound from './ProjectNotFound';
import "../css/ProjectDetails.css";

function ProjectDetails() {
  
  const { projectId } = useParams();
  const { projects, employees, formatBudget, formatDate } = useGlobalContext();

  const project = projects.find(p => p.projectId == projectId);

  if (!project) return <ProjectNotFound />

  return (
    <div className='project-details-container'>
      <h2>{project.projectName}</h2>
      <p>Budget: {formatBudget(project.budget)}</p>
      <p>Start Date: {formatDate(project.startDate)}</p>
      <h3>Engaged Employees:</h3>
      <ul>
        {project.engagedEmployees.length > 0 ? project.engagedEmployees.map(emp => {
          const employee = employees.find(e => e.employeeId == emp.employeeId);
          return (
            <li key={emp.employeeId}>
              {employee ? `${employee.FirstName} ${employee.LastName} - ${emp.role}` : 'Unknown Employee'}
              , Start: {formatDate(emp.startDate)},
              Duration: {emp.engagementDuration} months
            </li>
          );
        }) : <p>No employees engaged in this project.</p>}
      </ul>
    </div>
  )  
}

export default ProjectDetails;
