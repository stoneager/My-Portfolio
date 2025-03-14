const express = require('express');
const { getProjects, addProject } = require('../controllers/projectController');
const Project = require('../models/Project');  // ✅ Import Project model for delete route

const router = express.Router();

router.get('/', getProjects);
router.post('/', addProject);  // POST route

// DELETE route
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) return res.status(404).json({ message: 'Project not found' });
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
