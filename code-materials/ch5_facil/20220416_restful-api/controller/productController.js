const { Product } = require('../models')

const createProduct = async (req, res) => {
    const { name, price, stock } = req.body
    // req.body.name, req.body.price, req.body.quantity
    try {
        const newProduct = await Product.create({
            name,
            price,
            stock
        })

        res.status(201).json({
            status: 'success',
            data: {
                newProduct
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            errors: [err.message]
        })
    }
}

const findProducts = async (req, res) => {
    try {
        const products = await Product.findAll()
        res.status(200).json({
            status: 'Success',
            data: {
                products
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            errors: [err.message]
        })
    }
}

const findProductById = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({
            status: 'Success',
            data: {
                product
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            errors: [err.message]
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { name, price, stock } = req.body
        const id = req.params.id
        const product = await Product.update({
            name,
            price,
            stock
        }, {
            where: {
                id
            }
        })
        res.status(200).json({
            status: 'Success',
            data: {
                id, name, price, stock
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            errors: [err.message]
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        await Product.destroy({
            where: {
                id
            }
        })

        res.status(200).json({
            status: 'success',
            message: `Product dengan id ${id} terhapus`
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            errors: [err.message]
        })
    }
}

module.exports = {
    createProduct,
    findProducts,
    findProductById,
    updateProduct,
    deleteProduct,
}
