const router = require("express").Router();
let Panel = require("../models/panel.model");

router.route("/").get((req, res) => {
  Panel.find()
    .then((panels) => res.json(panels))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/add").post((req, res) => {
  const title = req.body.title;
  const show = req.body.show;
  const id = req.body.id;
  const newPanel = new Panel({ show, title, id });

  newPanel
    .save()
    .then(() => res.json(newPanel))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/:id").get((req, res) => {
  Panel.findById(req.params.id)
    .then((panels) => res.json(panels))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/:id").delete((req, res) => {
  Panel.findByIdAndDelete(req.params.id)
    .then(() => res.json("Panel deleted."))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.route("/update/:id").post((req, res) => {
  Panel.findById(req.params.id)
    .then((panel) => {
      panel.title = req.body.title;
      panel.show = req.body.show;
      panel.id = req.body.id;

      panel
        .save()
        .then(() => res.json("Panel updated."))
        .catch((err) => res.status(400).json("Error:" + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
