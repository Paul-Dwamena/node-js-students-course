// routes/products.js
const express = require("express");
const router = express.Router();
const { readDb, writeDb } = require("../db");
const { v4: uuidv4 } = require("uuid");

// GET all products
router.get("/", async (req, res) => {
  const products = await readDb();
  res.send({
    message: "Products retrieved successfully",
    products,
  });
});

// POST create a new product
router.post("/", async (req, res) => {
  const { title, description, price } = req.body;
  const products = await readDb();

  const newProduct = {
    id: uuidv4(),
    title,
    description,
    price,
  };

  products.push(newProduct);
  await writeDb(products);

  res.json({
    message: "Product added successfully",
    newProduct,
  });
});

// DELETE a product
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  let products = await readDb();

  const matchProduct = products.find((product) => product.id === id);
  if (!matchProduct) {
    return res.json({ error: "Product not found" });
  }

  products = products.filter((product) => product.id !== id);
  await writeDb(products);

  res.json({
    message: "Product deleted successfully",
    product: matchProduct,
  });
});

// GET single product
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const products = await readDb();
  const product = products.find((product) => product.id === id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
});

// PUT update product
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  let products = await readDb();
  const { title, description, price } = req.body;

  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  products[index] = {
    id: products[index].id,
    title: title !== undefined ? title : products[index].title,
    description: description !== undefined ? description : products[index].description,
    price: price !== undefined ? price : products[index].price,
  };

  await writeDb(products);
  res.json({
    message: "Product updated successfully",
    product: products[index],
  });
});

module.exports = router;
