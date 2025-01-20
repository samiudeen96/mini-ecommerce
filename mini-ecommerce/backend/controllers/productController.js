const productModel = require("../models/productModel");

exports.getProducts = async (req, res, next) => {
  const products = await productModel.find({});
  res.json({
    success: true,
    products,
  });
};

exports.getSingleProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await productModel.findById(id);

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(404).json({
        success: false,
        message: "Unable to get a product with given"
    })
  }
};
