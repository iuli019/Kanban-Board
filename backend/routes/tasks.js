const router = require("express").Router();
let Task = require("../models/task");
const auth = require("../middleware/auth");

router.route("/").get((req, res) => {
  Task.find()
    .then((tasks) => res.json(tasks))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post(auth, (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const index = req.body.index;
  const indexEdit = req.body.indexEdit;
  const id = req.body.id;
  const panelId = req.body.panelId;
  const newTask = new Task({
    name,
    description,
    index,
    indexEdit,
    id,
    panelId,
  });

  newTask
    .save()
    .then((newTask) => res.json(newTask))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/:id").get((req, res) => {
  Task.findById(req.params.id)
    .then((tasks) => res.json(tasks))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/:id").delete(auth, (req, res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(() => res.json("Task deleted."))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/update/:id").post(auth, (req, res) => {
  Task.findById(req.params.id)
    .then((task) => {
      task.name = req.body.name;
      task.description = req.body.description;
      task.index = req.body.index;
      task.indexEdit = req.body.indexEdit;
      task.id = req.body.id;
      task.panelId = req.body.panelId;

      task
        .save()
        .then(() => res.json("Task updated."))
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
