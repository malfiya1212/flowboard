const express = require("express");
const {
  getSprints,
  createSprint,
  startSprint,
  completeSprint,
} = require("../controllers/sprintController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.get("/", getSprints);
router.post("/", createSprint);
router.put("/:id/start", startSprint);
router.put("/:id/complete", completeSprint);

module.exports = router;
