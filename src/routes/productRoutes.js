import express from 'express';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/products
// @desc    Fetch all products
// @access  Public
router.get('/', (req, res) => {
    res.send('Get all products');
});

// @route   GET /api/products/:id
// @desc    Fetch single product by ID
// @access  Public
router.get('/:id', (req, res) => {
    res.send(`Get product with ID: ${req.params.id}`);
});

// @route   POST /api/products
// @desc    Create a new product
// @access  Private/Admin
router.post('/', authMiddleware, adminMiddleware, (req, res) => {
    res.send('Create a new product');
});

// @route   PUT /api/products/:id
// @desc    Update a product by ID
// @access  Private/Admin
router.put('/:id', authMiddleware, adminMiddleware, (req, res) => {
    res.send(`Update product with ID: ${req.params.id}`);
});

// @route   DELETE /api/products/:id
// @desc    Delete a product by ID
// @access  Private/Admin
router.delete('/:id', authMiddleware, adminMiddleware, (req, res) => {
    res.send(`Delete product with ID: ${req.params.id}`);
});

export default router;