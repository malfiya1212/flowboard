const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: [true, "Please provide a project key"],
      unique: true,
      uppercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Please provide a project name"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: {
          type: String,
          enum: ["Admin", "Member", "Viewer"],
          default: "Member",
        },
      },
    ],
    category: {
      type: String,
      enum: ["Software", "Mobile", "Backend", "Design", "Marketing", "Other"],
      default: "Software",
    },
    issueCounter: {
      type: Number,
      default: 100,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
