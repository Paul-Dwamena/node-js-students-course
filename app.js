const express = require("express");
const app = express();
const { readDb, writeDb } = require("./db")
const { v4: uuidv4 } = require("uuid")
app.use(express.json());






app.get("/products", async (req, res) => {
    const products = await readDb();
    res.send({
        message: "Products retrieved successfully",
        products
    });
});




app.post("/products", async (req, res) => {
    const { title, description, price } = req.body;
    //get all products from file
    const products = await readDb();

    //trying to create a new product object from what our user send to us
    let newProduct = {
        id: uuidv4(),
        title,
        description,
        price,
    };

    //push the new product into the array of products
    products.push(newProduct);
    await writeDb(products);

    res.json({
        message: "Product added successfully",
        newProduct,

    });
});

app.delete("/products/:id", async (req, res) => {
    const id = req.params.id;
    let products = await readDb();

    const matchProduct = products.find(product => product.id === id);
    console.log(matchProduct);

    if (!matchProduct) {
        return res.json({ error: "Product not found" });
    }

    products = products.filter(product => product.id !== id);
    await writeDb(products);


    res.json({
        message: "Product deleted successfully",
        product: matchProduct,
    });
});

//get single product
app.get("/products/:id", async (req, res) => {
    const id = req.params.id;
    const products = await readDb();
    const product = products.find((product) => product.id === id);
    if (!product) {
        return res.status(404).json({
            error: "Product not found"
        });
    }
    res.json(product);
})

//update a product
app.put("/products/:id", async (req, res) => {
    const id = req.params.id;
    let products = await readDb();
    const { title, description, price } = req.body;

    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Product not found" })
    }

    products[index] = {
        id: products[index].id,
        title: !title ? products[index].title : title,
        description: description !== undefined ? description : products[index].description,
        price: price !== undefined ? price : products[index].price
    }


    await writeDb(products);
    res.json({
        message: "Product updated successfully",
        product: products[index]
    });

})


function logRequest(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
}





app.all("/track", logRequest, (req, res) => {
    res.send(`Tracked a ${req.method} request`);
})




// Start the server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});




