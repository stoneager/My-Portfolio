const Project = require('../models/Project');

// Get all projects
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a project
const addProject = async (req, res) => {
    const newProject = new Project(req.body);
    try {
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });  // Catch error response
    }
};

module.exports = { getProjects, addProject };
