const MenuItem = require("../models/menuItemsModel");

exports.getMenu = async (req, res) => {
  try {
    // const menuItems = await MenuItem.find();
    res.json({name: "toluwalase"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
