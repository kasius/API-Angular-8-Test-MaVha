const Task = require("../models/task.model");
const fs = require("fs");

//Simple version, without validation or sanitation
exports.test = (req, res) => {
  res.send("Greetings from the Test controller!");
};

exports.task_all = (req, res) => {
  Task.find((err, task) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(task);
  });
};

exports.task_details = (req, res) => {
  Task.findById(req.params.id, (err, task) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.send(task);
  });
};

exports.task_create = (req, res) => {
  let task = new Task();
  task.description = req.body.description;
  task.state = req.body.state;
  task.file.data = fs.readFileSync(req.file.path);
  task.file.contentType = req.body.type;
  task.type = req.body.type;

  task.save(err => {
    if (err) {
        console.log(err);
      res.json({ status: 500, message: "error" });
    }
    res.json({ status: 200, message: "ok" });
  });
};

exports.task_update_state = (req, res) => {
  Task.findOneAndUpdate(
    { _id: req.params.id },
    { state: req.body.state },
    { upsert: true },
    (err, doc) => {
      if (err) return res.send(500, { error: err });
      return res.json({ status: 200, message: "ok" });
    }
  );
};
