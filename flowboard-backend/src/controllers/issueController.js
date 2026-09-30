const Issue = require("../models/Issue");
const Project = require("../models/Project");

// @desc Get issues with search, filters, project, sprint
// @route GET /api/issues
exports.getIssues = async (req, res) => {
  try {
    const { project, sprint, status, issueType, priority, search } = req.query;
    let query = {};

    if (project) query.project = project;
    if (sprint) query.sprint = sprint;
    if (status) query.status = status;
    if (issueType) query.issueType = issueType;
    if (priority) query.priority = priority;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { key: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const issues = await Issue.find(query)
      .populate("assignee", "name email avatar")
      .populate("reporter", "name email avatar")
      .populate("project", "name key")
      .populate("sprint", "name status")
      .populate("epic", "title key")
      .sort({ updatedAt: -1 });

    res.json({ success: true, count: issues.length, issues });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Create issue (Epic, Story, Task, Bug, Subtask)
// @route POST /api/issues
exports.createIssue = async (req, res) => {
  try {
    const {
      title,
      description,
      issueType,
      priority,
      projectId,
      sprintId,
      epicId,
      parentId,
      assigneeId,
      storyPoints,
      labels,
      dueDate,
    } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    // Auto-generate key: e.g. FB-101
    const issueKey = `${project.key}-${project.issueCounter}`;
    project.issueCounter += 1;
    await project.save();

    const issue = await Issue.create({
      key: issueKey,
      title,
      description,
      issueType: issueType || "Task",
      priority: priority || "Medium",
      project: projectId,
      sprint: sprintId || null,
      epic: epicId || null,
      parentIssue: parentId || null,
      assignee: assigneeId || null,
      reporter: req.user._id,
      storyPoints: storyPoints || 0,
      labels: labels || [],
      dueDate: dueDate || null,
      activityHistory: [
        {
          user: req.user._id,
          action: `created issue ${issueKey}`,
        },
      ],
    });

    const populatedIssue = await Issue.findById(issue._id)
      .populate("assignee", "name email avatar")
      .populate("reporter", "name email avatar")
      .populate("project", "name key")
      .populate("sprint", "name status");

    res.status(201).json({ success: true, issue: populatedIssue });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update issue (status, assignee, priority, points)
// @route PUT /api/issues/:id
exports.updateIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ success: false, message: "Issue not found" });
    }

    const { status, priority, assignee, storyPoints, sprint, title, description } = req.body;

    // Record activity history if status changed
    if (status && status !== issue.status) {
      issue.activityHistory.push({
        user: req.user._id,
        action: `changed status from ${issue.status} to ${status}`,
      });
      issue.status = status;
    }

    if (priority) issue.priority = priority;
    if (assignee !== undefined) issue.assignee = assignee;
    if (storyPoints !== undefined) issue.storyPoints = storyPoints;
    if (sprint !== undefined) issue.sprint = sprint;
    if (title) issue.title = title;
    if (description !== undefined) issue.description = description;

    await issue.save();

    const updated = await Issue.findById(issue._id)
      .populate("assignee", "name email avatar")
      .populate("reporter", "name email avatar")
      .populate("project", "name key")
      .populate("sprint", "name status");

    res.json({ success: true, issue: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Add comment to issue
// @route POST /api/issues/:id/comments
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ success: false, message: "Issue not found" });
    }

    issue.comments.push({
      user: req.user._id,
      text,
    });

    issue.activityHistory.push({
      user: req.user._id,
      action: `added a comment`,
    });

    await issue.save();

    const updated = await Issue.findById(issue._id)
      .populate("comments.user", "name email avatar")
      .populate("assignee", "name email avatar");

    res.json({ success: true, issue: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
