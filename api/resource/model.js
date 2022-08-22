// build your `Resource` model here
const db = require("../../data/dbConfig");

module.exports = {
  insert,
  get,
};

async function insert(resource) {
  return await db("resources").insert(resource);
}

async function get(id) {
  if (!id) return await db("resources");

  return await db("resources").where("resource_id", id).first();
}