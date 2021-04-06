const express = require("express");
const router = new express.Router();
// const employees = require("../controllers/employees.js");
// const logissue = require("../controllers/logissue.js");
const executeSqls = require("../db_scripts/executeSqls.js");

router
  .route("/products/:id?")
  .get(executeSqls.weakSqls);

  router
  .route("/getSqlresult/:sqltext")
  .get(executeSqls.adhocSqls);
  // .post(executeSqls.adhocSqlsViaPost);

  router
  .route("/executeProc_log_order")
  .post(executeSqls.executeProc_log_order);

// router
//   .route("/insert_issue/:email?/:issue?")
//   // .get(logissue.funInsert)
//   .post(logissue.funInsert);
// // .put(logissue.funInsert);
// // .delete(logissue.funInsert)

module.exports = router;
