const express = require('express');
const router = express.Router();

const products = require('../data/products.json');

router.get('/categories', (req, res) => {
  const categories = [...new Set(products.map(p => p.category))];
  const subcategories = [...new Set(products.map(p => p.subcategory))];
  res.json({ categories, subcategories });
});

router.get('/', (req, res) => {
  try {
    let filteredProducts = [...products];
    const { category, subcategory, minPrice, maxPrice, search, sort, featured, onSale, new: isNew } = req.query;

    if (category) {
      filteredProducts = filteredProducts.filter(p =>
        p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (subcategory) {
      filteredProducts = filteredProducts.filter(p =>
        p.subcategory.toLowerCase() === subcategory.toLowerCase()
      );
    }

    if (search) {
      const searchTerm = search.toLowerCase();
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm) ||
        p.subcategory.toLowerCase().includes(searchTerm)
      );
    }

    if (minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= Number(minPrice));
    }

    if (maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= Number(maxPrice));
    }

    if (featured === 'true') {
      filteredProducts = filteredProducts.filter(p => p.featured);
    }

    if (onSale === 'true') {
      filteredProducts = filteredProducts.filter(p => p.onSale);
    }

    if (isNew === 'true') {
      filteredProducts = filteredProducts.filter(p => p.new);
    }

    if (sort) {
      switch (sort) {
        case 'price-asc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          filteredProducts.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
          break;
        case 'name':
          filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          break;
      }
    }

    const categories = [...new Set(products.map(p => p.category))];
    const subcategories = [...new Set(products.map(p => p.subcategory))];

    res.json({
      products: filteredProducts,
      total: filteredProducts.length,
      categories,
      subcategories
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const related = products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
    res.json({ product, related });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
