const express = require('express');
const router = express.Router();

const Cart = require('../models/Carts');
const Product = require('../models/Products');
const User = require('../models/Users');

// user: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
// },
// products: [{
//     product: {
//         type: Schema.Types.ObjectId,
//         ref: 'Product',
//         required: true
//     },
//     quantity: {
//         type: Number,
//         required: true
//     }
// }]

router.get('/get-cart/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.findOne({ user: userId }).populate('products.product');
        res.status(200).json(cart);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.post('/add-to-cart', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({
                user: userId,
                products: [{ product: productId, quantity }]
            });
        } else {
            const productIndex = cart.products.findIndex(product => product.product == productId);
            if (productIndex >= 0) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }
        }
        await cart.save();
        res.status(200).send('Product added to cart');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.put('/update-cart', async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        const cart = await Cart.findOne({ user: userId });
        const productIndex = cart.products.findIndex(product => product.product == productId);
        if (productIndex >= 0) {
            cart.products[productIndex].quantity = quantity;
        }
        await cart.save();
        res.status(200).send('Cart updated');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.delete('/delete-from-cart', async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const cart = await Cart.findOne({ user: userId });
        cart.products = cart.products.filter(product => product.product != productId);
        await cart.save();
        res.status(200).send('Product deleted from cart');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;