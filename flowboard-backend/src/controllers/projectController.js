const Project = require("../models/Project");

// @desc Get all projects
// @route GET /api/projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("lead", "name email avatar")
      .populate("members.user", "name email avatar role");
    res.json({ success: true, count: projects.length, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Create new project
// @route POST /api/projects
exports.createProject = async (req, res) => {
  try {
    const { key, name, description, category } = req.body;

    const existing = await Project.findOne({ key: key.toUpperCase() });
    if (existing) {
      return res.status(400).json({ success: false, message: "Project key already exists" });
    }

    const project = await Project.create({
      key: key.toUpperCase(),
      name,
      description,
      category,
      lead: req.user._id,
      members: [{ user: req.user._id, role: "Admin" }],
    });

    res.status(201).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single project by ID
// @route GET /api/projects/:id
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("lead", "name email avatar")
      .populate("members.user", "name email avatar role");

    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.json({ success: true, project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
