const express = require("express");
const {
  getIssues,
  createIssue,
  updateIssue,
  addComment,
} = require("../controllers/issueController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.get("/", getIssues);
router.post("/", createIssue);
router.put("/:id", updateIssue);
router.post("/:id/comments", addComment);

module.exports = router;
