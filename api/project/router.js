// build your `/api/projects` router here
const router = require("express").Router();
const Project = require("./model");

router.get("/", async (req, res) => {
  try {
    const projects = await Project.get();
    res.status(200).send(projects);
  } catch (err) {
    res.statusMessage = err.message; // ??
  }
});

router.post("/", async (req, res) => {
  const resource = req.body;
  const projectName = resource.project_name
  if (!projectName) {
    return res.status(500).json ({
      customMessage: "project must have a name"
    })
  } else {
    const newProject = await Project.insert(resource);
    return res.status(201).send(newProject);
  }
});

router.use((err, req, res) => {
  res.status(500).json({
    customMessage: "something went wrong inside the projects router",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
