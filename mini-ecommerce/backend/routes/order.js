const express = require("express");
const router = express.Router();
const { createOrder } = require("../controllers/orderController");
const { getOrders } = require("../controllers/orderController");
// order
router.route("/order").post(createOrder);
router.route("/orders").get(getOrders);

module.exports = router;
