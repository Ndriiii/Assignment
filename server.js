const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const db = require("./db");

const productRoutes = require("./routes/productroutes")

app.use(cors());
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'Bike Store API is running!',
    endpoints: {
      'GET /api/products': 'Get all products',
      'GET /api/products/home': 'Get home page data (all sections)',
      'GET /api/products/new': 'Get new products (within 2 weeks)',
      'GET /api/products/discount': 'Get discount products',
      'GET /api/products/category/:category': 'Get products by category (mountain/road/electric)',
      'GET /api/products/category/:category/discount': 'Get discount products by category',
      'GET /api/products/:id': 'Get single product by ID'
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});