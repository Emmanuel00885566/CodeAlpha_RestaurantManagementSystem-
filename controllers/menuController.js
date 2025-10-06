let menuItems = [
  { id: 1, name: "Fried Rice", category: "Main Course", price: 2500, isAvailable: true },
  { id: 2, name: "Coke", category: "Drink", price: 700, isAvailable: true },
  { id: 3, name: "Ice Cream", category: "Dessert", price: 1500, isAvailable: false }
];

export const getAllMenuItems = (req, res) => {
  res.json(menuItems);
};

export const getMenuItemById = (req, res) => {
  const item = menuItems.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json(item);
};

export const addMenuItem = (req, res) => {
  const newItem = {
    id: menuItems.length + 1,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    isAvailable: req.body.isAvailable ?? true
  };
  menuItems.push(newItem);
  res.status(201).json(newItem);
};

export const updateMenuItem = (req, res) => {
  const item = menuItems.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: "Item not found" });

  item.name = req.body.name || item.name;
  item.category = req.body.category || item.category;
  item.price = req.body.price || item.price;
  item.isAvailable = req.body.isAvailable ?? item.isAvailable;

  res.json(item);
};

export const deleteMenuItem = (req, res) => {
  menuItems = menuItems.filter(i => i.id !== parseInt(req.params.id));
  res.json({ message: "Item deleted successfully" });
};
