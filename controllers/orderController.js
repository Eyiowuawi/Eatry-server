const Order = require("../models/orderModel");
const MenuItem = require("../models/menuItemsModel");

exports.createOrder = async (req, res) => {
  const { userId, items } = req.body;
  try {
    const orderItems = await Promise.all(
      items.map(async (item) => {
        const menuItem = await MenuItem.findById(item.menuItemId);
        if (!menuItem)
          throw new Error(`Menu item with ID ${item.menuItemId} not found`);
        return {
          menuItem: menuItem._id,
          quantity: item.quantity,
        };
      })
    );
    const total = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const order = new Order({ user: userId, items: orderItems, total });
    await order.save();
    res.status(201).json({ msg: "Order successfully created", order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
