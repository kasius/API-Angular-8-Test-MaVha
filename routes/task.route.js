const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "./uploads/" });
// const upload =  multer({ dest: __dirname +'/new/'});
const router = express.Router();

const task_controller = require("../controllers/task.controller");

// a simple test url to check that all of our files are communicating correctly.
router.get("/", task_controller.task_all);
router.get("/:id", task_controller.task_details);
router.get("/test", task_controller.test);
router.post("/", upload.single('file'), task_controller.task_create);
router.put("/:id", task_controller.task_update_state);
module.exports = router;
