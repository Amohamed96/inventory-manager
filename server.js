const router = require("express").Router();
const item = require("./items");

let itemDirectory = item;

router.get("/item", function (req, res) {
  res.send(itemDirectory);
});

router.get("/item/:id", function (req, res) {
  const { id } = req.params;

  const item = itemDirectory.find((b) => b.ID === id);
  if (!item) return res.status(404).send("Item does not exists");

  res.send(item);
});

router.post("/item", function (req, res) {
  const { itemName, ID, warehouse } = req.body;

  const itemExist = itemDirectory.find((b) => b.ID === ID);
  if (itemExist) return res.send("Item already exists");

  const item = {
    itemName,
    ID,
    warehouse,
  };
  itemDirectory.push(item);

  res.send(item);
});
router.put("/item/:id", function (req, res) {
  const { id } = req.params;
  const { itemName, ID, warehouse } = req.body;

  let book = itemDirectory.find((b) => b.ID === id);
  if (!book) return res.status(404).send("Book does not exist");

  const updateField = (val, prev) => (!val ? prev : val);

  const updatedItem = {
    ...item,
    itemName: updateField(itemName, item.itemName),
    ID: updateField(ID, item.ID),
    currentWarehouse: updateField(currentWarehouse, item.currentWarehouse),
  };

  const itemIndex = itemsDirectory.findIndex((b) => b.ID === item.ID);
  itemDirectory.splice(itemIndex, 1, updatedItem);

  res.status(200).send(updatedItem);
});

router.delete("/items/:id", function (req, res) {
  const { id } = req.params;

  let item = itemDirectory.find((b) => b.ID === id);
  if (!item) return res.status(404).send("item does not exist");

  itemDirectory = itemDirectory.filter((b) => b.ID !== id);

  res.send("Success");
});

module.exports = router;
