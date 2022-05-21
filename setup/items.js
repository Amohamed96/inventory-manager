const { generateSKU } = require("./functions");
const warehouses = require("./warehouses");

module.exports = {
  0: {
    id: 0,
    SKU: generateSKU(),
    name: "PS5",
    warehouse: warehouses[0],
    units: 1276,
  },
  1: {
    id: 1,
    SKU: generateSKU(),
    name: "Iphone",
    warehouse: warehouses[1],
    units: 300,
  },
  2: {
    id: 2,
    SKU: generateSKU(),
    name: "Keyboard",
    warehouse: warehouses[2],
    units: 450,
  },
  3: {
    id: 3,
    SKU: generateSKU(),
    name: "Chain",
    warehouse: warehouses[1],
    units: 214,
  },
  4: {
    id: 4,
    SKU: generateSKU(),
    name: "RTX-3090",
    warehouse: warehouses[1],
    units: 9,
  },
};
