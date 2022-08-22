// build your `/api/resources` router here
const router = require("express").Router();
const Resource = require("./model");
const dB = require('../../data/dbConfig')

router.get("/", async (req, res) => {
  try {
    const resources = await Resource.get();
    res.status(200).send(resources);
  } catch (err) {
    res.statusMessage = err.message; // ??
  }
});

router.post("/", async (req, res) => {
  try {
    const resource = req.body;
    const resourceName = resource.resource_name;
    if (!resource) return res.status(400).send()
    if (!resourceName) {
      return res.status(500).json({
        customMessage: "resource must have a name"
      })
    }
    const existingResource = await dB('resources').where('resource_name', resourceName).first()
    if (existingResource) {
      return res.status(400).json({
        customMessage: "resource_name already exists"
      })
    }
    const newResourceId = await Resource.insert(resource);
    const newResource = await Resource.get(newResourceId)
    return res.status(201).send(newResource);
  } catch (err) {
    res.statusMessage = err.message;
  }
}
);

router.use((err, req, res) => {
  res.status(500).json({
    customMessage: "something went wrong inside the resources router",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
