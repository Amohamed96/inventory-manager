const router = require("express").Router();
const item = require("./items");

let itemDirectory = item;

router.get("/item", function (req, res) {
  res.send(itemDirectory);
});

router.get("/item/:id", function (req, res) {
  const { id } = req.params;

  const item = itemDirectory.find((b) => b.ID === id);
  if (!item) return res.status(404).send("Item does not exist");

  res.send(item);
});

router.post("/item", function (req, res) {
  const { name, ID, warehouse } = req.body;

  const itemExist = itemDirectory.find((b) => b.ID === ID);
  if (itemExist) return res.send("Item already exist");

  const item = {
    name,
    ID,
    warehouse,
  };
  itemDirectory.push(item);

  res.send(item);
});

module.exports = router;
