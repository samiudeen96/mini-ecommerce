exports.getProducts = (req, res, next) => {
    res.json({
        success: true,
        message: 'Get Products works'
    })
}

exports.getSingleProduct = () => {
    res.json({
        success: true,
        message: 'Get single product works'
    })
}