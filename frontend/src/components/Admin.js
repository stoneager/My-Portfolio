import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Admin.css';

const Admin = () => {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        techStack: '',
        githubLink: '',
        demoLink: ''
    });
    const [loading, setLoading] = useState(true);

    const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/projects';

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await axios.get(baseURL);
            setProjects(res.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddProject = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            techStack: formData.techStack.split(',').map(item => item.trim())
        };

        try {
            await axios.post(baseURL, payload);
            alert('Project added successfully!');
            setFormData({ title: '', description: '', techStack: '', githubLink: '', demoLink: '' });
            fetchProjects();
        } catch (error) {
            console.error('Error adding project:', error);
            alert('Failed to add project');
        }
    };

    const handleDeleteProject = async (id) => {
        try {
            await axios.delete(`${baseURL}/${id}`);
            alert('Project deleted successfully!');
            fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Failed to delete project');
        }
    };

    return (
        <div className="admin-container">
            <h2>Admin Panel</h2>

            <form onSubmit={handleAddProject} className="admin-form">
                <h3>Add New Project</h3>
                <input
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                ></textarea>
                <input
                    type="text"
                    placeholder="Tech Stack (comma separated)"
                    value={formData.techStack}
                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="GitHub Link"
                    value={formData.githubLink}
                    onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Live Demo Link"
                    value={formData.demoLink}
                    onChange={(e) => setFormData({ ...formData, demoLink: e.target.value })}
                />
                <button type="submit">Add Project</button>
            </form>

            <h3>Existing Projects</h3>
            {loading ? <p>Loading projects...</p> : (
                <div>
                    {projects.map((project) => (
                        <div key={project._id} className="project-card">
                            <div>
                                <h4>{project.title}</h4>
                                <p>{project.description}</p>
                                <p><strong>Tech Stack:</strong> {project.techStack.join(', ')}</p>
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">GitHub</a>
                                <a href={project.demoLink} target="_blank" rel="noopener noreferrer">Live Demo</a>
                            </div>
                            <button onClick={() => handleDeleteProject(project._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Admin;
