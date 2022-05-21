const PORT = 3001;
const items = require("./items");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// initial database

const warehouses = ["Warehouse 1", "Warehouse 2", "Warehouse 3"];

// CRUD actions start below
//------------------------------------------------

// GET items main page
app.get("/", (req, res) => {
  const templateVars = { items };
  res.render("main", templateVars);
});

// GET "create an items item" page
app.get("/new", (req, res) => {
  const templateVars = { warehouses };
  res.render("items_new", templateVars);
});

// GET "create a warehouse" page
app.get("/warehouse/new", (req, res) => {
  res.render("warehouse_new");
});

// GET "Edit an items item" page
app.get("/items/:ID", (req, res) => {
  const ID = req.params.ID;
  const templateVars = { ...items[ID], warehouses };
  res.render("items_edit", templateVars);
});

// Update product information
app.post("/items/:id", (req, res) => {
  const ID = req.params.id;
  items[ID].product = req.body.product;
  items[ID].qty = req.body.qty;
  items[ID].location = req.body.warehouse;
  items[ID].price = req.body.price;
  res.redirect("/");
});

// Create new product
app.post("/new", (req, res) => {
  const ID = Number(Object.keys(items).pop()) + 1; // this will be the ID of the new product
  items[ID] = {
    ID,
    code: generateRandomString(),
    product: req.body.product,
    qty: req.body.qty,
    location: req.body.warehouse,
    price: req.body.price,
  };
  res.redirect("/");
});

// Create new warehouse
app.post("/warehouse/new", (req, res) => {
  const warehouse = req.body.warehouse;
  warehouses.push(warehouse);
  res.redirect("/");
});

// Delete product
app.post("/items/:id/delete", (req, res) => {
  const ID = req.params.id;
  delete items[ID];
  res.redirect(`/`);
});

// Active port
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
