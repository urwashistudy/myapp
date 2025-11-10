const express = require('express')
const router = express.Router()
const Order = require('../models/order')
const Product = require('../models/product')

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('userId', 'name email')
        res.json(orders)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error Fetching orders' })
    }
});

router.get('/:ordeId', async (req, res) => {
    console.log(req.params.ordeId)
    const orderId = req.params.ordeId
    const order = await Order.findById(orderId).populate('userId', 'name email')
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json(order)
});

router.post('/', async (req, res) => {
    try {
        const { products, userId, paymentMethod, shippingAddress } = req.body;

        //validate product
        const productIds = products.map((product => product.productId))//Get all product Id related to orders
        const dbProducts = await Product.find({ _id: { $in: productIds } })

        if (dbProducts.length !== products.length) {
            return res.status(400).json({ message: 'Invaild product ID' })
        }

        let totalPrice = 0;
        products.forEach(product => {
            const dbProduct = dbProducts.find(p => p._id.toString() === product.productId)
            totalPrice += dbProduct.price * product.quantity
        });

        const newOrder = new Order({
            userId,
            products,
            totalPrice,
            paymentMethod,
            shippingAddress
        })
        await newOrder.save()
        res.status(201).json(newOrder)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error occured while creating order' })
    }
})

router.put('/:orderId', async (req, res) => {
    try {
        const orderId = req.params.orderId
        console.log(orderId, req.body)
        const { status } = req.body
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, {
            new: true
        })
        if (!updatedOrder) {
            return res.status(404).send({ message: 'Order not found' })
        }
        res.send(updatedOrder)
    } catch (err) {
        console.error(err)
        res.status(400).send({ message: 'Error updating this order' })
    }

})

// router.delete('/:id', async (req, res, next) => {
//     try {
//         const userId = req.params.id;
//         await User.findByIdAndDelete(userId)
//         res.status(204).send()
//     }
//     catch (err) {
//         console.error(err)
//         res.status(500).send({ message: 'Error while deleting the user' })
//     }
// })

module.exports = router