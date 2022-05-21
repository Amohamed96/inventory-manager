const generateSKU = function () {
  let sku = "";
  const characters = "0123456789";
  const length = characters.length;
  for (let i = 0; i < 6; i++) {
    let number = Math.floor(Math.random() * length); //(inclusive of 0, but not 1)
    sku += characters[number];
  }
  return `196${sku}`;
};

module.exports = { generateSKU };
