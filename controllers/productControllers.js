// controllers/productController.js
const db = require("../db");

const productController = {
  getAllProducts: (req, res) => {
    const query = `
      SELECT 
        id, name, category, description, 
        CASE 
          WHEN is_discount = TRUE THEN price 
          ELSE price 
        END as price,
        original_price,
        image_name, is_discount, discount_percentage, created_at
      FROM products 
      ORDER BY created_at DESC
    `;
    
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching products:', err);
        return res.status(500).json({ error: 'Failed to fetch products' });
      }
      res.json(results);
    });
  },

  // Get new products (products created within last 2 weeks)
  getNewProducts: (req, res) => {
    const query = `
      SELECT 
        id, name, category, description, 
        CASE 
          WHEN is_discount = TRUE THEN price 
          ELSE price 
        END as price,
        original_price,
        image_name, is_discount, discount_percentage, created_at
      FROM products 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 2 WEEK)
      ORDER BY created_at DESC
    `;
    
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching new products:', err);
        return res.status(500).json({ error: 'Failed to fetch new products' });
      }
      res.json(results);
    });
  },

  getDiscountProducts: (req, res) => {
    const query = `
      SELECT 
        id, name, category, description, price, original_price,
        image_name, is_discount, discount_percentage, created_at
      FROM products 
      WHERE is_discount = TRUE
      ORDER BY discount_percentage DESC, created_at DESC
    `;
    
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching discount products:', err);
        return res.status(500).json({ error: 'Failed to fetch discount products' });
      }
      res.json(results);
    });
  },

  getProductsByCategory: (req, res) => {
    const { category } = req.params;
    const validCategories = ['mountain', 'road', 'electric'];
    
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const query = `
      SELECT 
        id, name, category, description, 
        CASE 
          WHEN is_discount = TRUE THEN price 
          ELSE price 
        END as price,
        original_price,
        image_name, is_discount, discount_percentage, created_at
      FROM products 
      WHERE category = ?
      ORDER BY created_at DESC
    `;
    
    db.query(query, [category], (err, results) => {
      if (err) {
        console.error('Error fetching products by category:', err);
        return res.status(500).json({ error: 'Failed to fetch products by category' });
      }
      res.json(results);
    });
  },

  getCategoryDiscountProducts: (req, res) => {
    const { category } = req.params;
    const validCategories = ['mountain', 'road', 'electric'];
    
    if (!validCategories.includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const query = `
      SELECT 
        id, name, category, description, price, original_price,
        image_name, is_discount, discount_percentage, created_at
      FROM products 
      WHERE category = ? AND is_discount = TRUE
      ORDER BY discount_percentage DESC, created_at DESC
    `;
    
    db.query(query, [category], (err, results) => {
      if (err) {
        console.error('Error fetching category discount products:', err);
        return res.status(500).json({ error: 'Failed to fetch category discount products' });
      }
      res.json(results);
    });
  },

  getProductById: (req, res) => {
    const { id } = req.params;
    
    const query = `
      SELECT 
        id, name, category, description, 
        CASE 
          WHEN is_discount = TRUE THEN price 
          ELSE price 
        END as price,
        original_price,
        image_name, is_discount, discount_percentage, created_at
      FROM products 
      WHERE id = ?
    `;
    
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error fetching product:', err);
        return res.status(500).json({ error: 'Failed to fetch product' });
      }
      
      if (results.length === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      res.json(results[0]);
    });
  },

  getHomePageData: (req, res) => {
    const queries = {
      newProducts: `
        SELECT 
          id, name, category, description, 
          CASE 
            WHEN is_discount = TRUE THEN price 
            ELSE price 
          END as price,
          original_price,
          image_name, is_discount, discount_percentage, created_at
        FROM products 
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL 2 WEEK)
        ORDER BY created_at DESC
        LIMIT 8
      `,
      discountProducts: `
        SELECT 
          id, name, category, description, price, original_price,
          image_name, is_discount, discount_percentage, created_at
        FROM products 
        WHERE is_discount = TRUE
        ORDER BY discount_percentage DESC, created_at DESC
        LIMIT 8
      `,
      mountainBikes: `
        SELECT 
          id, name, category, description, 
          CASE 
            WHEN is_discount = TRUE THEN price 
            ELSE price 
          END as price,
          original_price,
          image_name, is_discount, discount_percentage, created_at
        FROM products 
        WHERE category = 'mountain'
        ORDER BY created_at DESC
        LIMIT 8
      `,
      roadBikes: `
        SELECT 
          id, name, category, description, 
          CASE 
            WHEN is_discount = TRUE THEN price 
            ELSE price 
          END as price,
          original_price,
          image_name, is_discount, discount_percentage, created_at
        FROM products 
        WHERE category = 'road'
        ORDER BY created_at DESC
        LIMIT 8
      `,
      electricBikes: `
        SELECT 
          id, name, category, description, 
          CASE 
            WHEN is_discount = TRUE THEN price 
            ELSE price 
          END as price,
          original_price,
          image_name, is_discount, discount_percentage, created_at
        FROM products 
        WHERE category = 'electric'
        ORDER BY created_at DESC
        LIMIT 8
      `
    };

    const executeQueries = async () => {
      try {
        const results = {};
        const queryKeys = Object.keys(queries);
        
        for (const key of queryKeys) {
          const data = await new Promise((resolve, reject) => {
            db.query(queries[key], (err, results) => {
              if (err) reject(err);
              else resolve(results);
            });
          });
          results[key] = data;
        }
        
        res.json(results);
      } catch (error) {
        console.error('Error fetching home page data:', error);
        res.status(500).json({ error: 'Failed to fetch home page data' });
      }
    };

    executeQueries();
  }
};

module.exports = productController;