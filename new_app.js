// app.js
const express = require("express");
const app = express();
const productsRouter = require("./routes/products");

// Middleware
app.use(express.json());

function logRequest(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
}

// Use product routes
app.use("/products", productsRouter);


// Example for app.all
app.all("/track", logRequest, (req, res) => {
  res.send(`Tracked a ${req.method} request`);
});


// Start server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
