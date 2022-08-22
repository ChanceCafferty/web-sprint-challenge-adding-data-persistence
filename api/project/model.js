// build your `Project` model here
const db = require("../../data/dbConfig");

module.exports = {
  insert,
  get,
};

async function get(id) {
  if (!id) {
    const projects = await db("projects");
    return projects.map((proj) => {
      return {
        ...proj,
        project_completed: Boolean(proj.project_completed),
      };
    });
  } else {
    const project = await db("projects").where("project_id", id).first();
    return {
      ...project,
      project_completed: Boolean(project?.project_completed),
    };
  }
}

async function insert(project) {
  const newProjectId = await db("projects").insert(project);
  return await get(newProjectId);
}