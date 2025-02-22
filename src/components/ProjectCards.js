// components/ProjectCards.js
import React from 'react';
import { ExternalLink } from 'lucide-react';
const ProjectCards = ({ featuredProjects }) => (
  <>
    {featuredProjects.map((project) => (
      <div key={project.title} className="project-card">
        <div className="project-card-image-container">
          <img
            src={project.image}
            alt={project.title}
            className="project-card-image"
            loading="lazy"
            width={600}
            height={400}
          />
          <div className="project-card-overlay">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-link"
              aria-label={`Xem chi tiết dự án ${project.title}`}
            >
              <span>Xem Chi Tiết</span>
              <ExternalLink size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="project-card-content">
          <h3 className="project-card-title">{project.title}</h3>
          <p className="project-card-description">{project.description}</p>
        </div>
      </div>
    ))}
  </>
);
export default ProjectCards;