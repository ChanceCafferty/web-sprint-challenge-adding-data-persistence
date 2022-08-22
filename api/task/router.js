// build your `/api/tasks` router here
const router = require("express").Router();
const Task = require("./model");
const Project = require("../project/model");

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.get();
    res.status(200).send(tasks);
  } catch (err) {
    res.statusMessage = err.message; // ??
  }
});

router.post("/", async (req, res) => {
  const task = req.body;
  if (!task || !task.task_description || !task.project_id) return res.status(400).send('missing required fields');

  const existingProject = await Project.get(task.project_id);
  // if (existingProject) return res.status(400).send("a project with this project_id already exists")

  const newTask = await Task.insert(task);

  res.status(201).send(newTask);
});

router.use((err, req, res) => {
  res.status(500).json({
    customMessage: "something went wrong inside the tasks router",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
