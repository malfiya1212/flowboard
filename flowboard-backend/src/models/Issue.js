const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ActivitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    action: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const IssueSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    title: {
      type: String,
      required: [true, "Please provide an issue title"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    issueType: {
      type: String,
      enum: ["Epic", "Story", "Task", "Bug", "Subtask"],
      default: "Task",
    },
    status: {
      type: String,
      enum: ["TO DO", "IN PROGRESS", "IN REVIEW", "DONE"],
      default: "TO DO",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Highest"],
      default: "Medium",
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    sprint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sprint",
      default: null,
    },
    epic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Issue",
      default: null,
    },
    parentIssue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Issue",
      default: null,
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    storyPoints: {
      type: Number,
      default: 0,
    },
    labels: [
      {
        type: String,
        trim: true,
      },
    ],
    dueDate: {
      type: Date,
    },
    attachments: [
      {
        filename: String,
        path: String,
        mimetype: String,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    comments: [CommentSchema],
    activityHistory: [ActivitySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Issue", IssueSchema);
