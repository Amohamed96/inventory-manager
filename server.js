const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3001;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

const items = require("./setup/items");
const warehouses = require("./setup/warehouses");
const { generateSKU } = require("./setup/functions");

app.get("/", (req, res) => {
  const templateVars = { items };
  res.render("main", templateVars);
});

app.get("/new", (req, res) => {
  const ID = req.params.id;
  const templateVars = { ...items[ID], items, warehouses };
  res.render("new_item", templateVars);
});

app.get("/warehouse/new", (req, res) => {
  res.render("warehouse");
});

app.get("/items/:id", (req, res) => {
  const ID = req.params.id;
  const templateVars = { ...items[ID], warehouses };
  res.render("change", templateVars);
});

app.post("/items/:id", (req, res) => {
  const id = req.params.id;
  items[id].name = req.body.name;
  items[id].warehouse = req.body.warehouse;
  items[id].units = req.body.units;
  res.redirect("/");
});

app.post("/new", (req, res) => {
  const id = Number(Object.keys(items).pop()) + 1;
  items[id] = {
    id,
    SKU: generateSKU(),
    name: req.body.name,
    warehouse: req.body.warehouse,
    units: req.body.units,
  };
  res.redirect("/");
});

app.post("/warehouse/new", (req, res) => {
  const warehouse = req.body.warehouse;
  warehouses.push(warehouse);
  res.redirect("/");
});

app.post("/items/:id/delete", (req, res) => {
  const id = req.params.id;
  delete items[id];
  res.redirect(`/`);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
