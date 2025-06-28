const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

const filePath = './data/products.json';

app.use(bodyParser.json());

// GET all products
app.get('/products', (req, res) => {
    const data = JSON.parse(fs.readFileSync(filePath));
    res.json(data);
});

// GET product by ID
app.get('/products/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync(filePath));
    const product = data.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

// POST new product
app.post('/products', (req, res) => {
    const data = JSON.parse(fs.readFileSync(filePath));
    const newProduct = {
        id: data.length ? data[data.length - 1].id + 1 : 1,
        name: req.body.name,
        price: req.body.price
    };
    data.push(newProduct);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.status(201).json(newProduct);
});

// PUT update product
app.put('/products/:id', (req, res) => {
    let data = JSON.parse(fs.readFileSync(filePath));
    const index = data.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Product not found' });

    data[index] = { ...data[index], ...req.body };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    res.json(data[index]);
});

// DELETE product
app.delete('/products/:id', (req, res) => {
    let data = JSON.parse(fs.readFileSync(filePath));
    const filteredData = data.filter(p => p.id !== parseInt(req.params.id));
    if (filteredData.length === data.length)
        return res.status(404).json({ message: 'Product not found' });

    fs.writeFileSync(filePath, JSON.stringify(filteredData, null, 2));
    res.json({ message: 'Product deleted' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
