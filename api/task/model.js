// build your `Task` model here
const db = require("../../data/dbConfig");

module.exports = {
  insert,
  get,
};

async function get(id) {
  if (!id) {
    const tasks = await db("tasks");
    const promises = tasks.map(async task => {
      const project = await db("projects").where('project_id', task.project_id).first();
      return {
        task_notes: task.task_notes,
        task_description: task.task_description,
        task_completed: Boolean(task.task_completed),
        project_description: project.project_description,
        project_name: project.project_name
      }
    })
    return await Promise.all(promises)
  }

  const task =  await db("tasks").where('task_id', id).first();
  const project = await db("projects").where('project_id', task.project_id).first();
  return {
    task_notes: task.task_notes,
    task_description: task.task_description,
    task_completed: Boolean(task.task_completed),
    project_description: project.project_description,
    project_name: project.project_name
  }
}
async function insert(task) {
  const newTaskId = await db("tasks").insert(task);
  return await get(newTaskId);
}
