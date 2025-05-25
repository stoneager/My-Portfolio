import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Project.css'; // Import the CSS file

const Projects = () => {
    const [projects, setProjects] = useState([]);

    const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/projects';

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get(baseURL);
                setProjects(res.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="projects-container" id = "projects">
            <h2 className="projects-title">My Projects</h2>
            <div className="projects-grid">
                {projects.map((project) => (
                    <div key={project._id} className="project-card">
                        <h3 className="project-title">{project.title}</h3>
                        <p className="project-desc">{project.description}</p>
                        <p className="project-tech"><strong>Tech Stack:</strong> {project.techStack.join(', ')}</p>
                        <div className="project-links">
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer">GitHub</a>
                             {project.demoLink && (
                                <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                                    Website Link
                                </a>)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
