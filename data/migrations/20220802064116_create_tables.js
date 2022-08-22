exports.up = function (knex) {
  return knex.schema
    .createTable("projects", (tbl) => {
      tbl.increments("project_id");
      tbl.varchar("project_name", 80).notNullable();
      tbl.varchar("project_description", 80);
      tbl.integer("project_completed").defaultsTo(0); // <==== UNSURE ABOUT THIS LINE!!!
    })

    .createTable("resources", (tbl) => {
      tbl.increments("resource_id");
      tbl.varchar("resource_name", 80).unique().notNullable();
      tbl.varchar("resource_description", 80);
    })

    .createTable("tasks", (tbl) => {
      tbl.increments("task_id");
      tbl.varchar("task_description", 80).notNullable();
      tbl.varchar("task_notes", 80);
      tbl.integer("task_completed").notNullable().defaultsTo(0); // <==== UNSURE ABOUT THIS LINE!!!
      tbl
        .integer("project_id")
        .references("project_id")
        .inTable("projects")
        .notNullable()
        .unsigned();
    })

    .createTable(`project_resources`, (tbl) => {
      tbl
        .integer("project_id") // <==== ALSO
        .references("project_id") // <==== UNSURE
        .inTable("projects") // <==== ABOUT
        .notNullable() // <==== ALL
        .unsigned(); // <==== THIS!!!!

      tbl
        .integer("resource_id") // <==== ALSO
        .references("resource_id") // <==== UNSURE
        .inTable("resources") // <==== ABOUT
        .notNullable() // <==== ALL
        .unsigned(); // <==== THIS!!!!
      tbl.primary(["project_id", "resource_id"]);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("project_resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};
