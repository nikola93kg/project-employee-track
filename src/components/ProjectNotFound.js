import React from 'react';
import pnf from "../assets/img/project-not-found.svg"

function ProjectNotFound() {
  return (
    <div className='project-not-found'>
            <img src={pnf} alt="project-not-found" />
            <p>Project not found</p>
      </div>
  )
}

export default ProjectNotFound