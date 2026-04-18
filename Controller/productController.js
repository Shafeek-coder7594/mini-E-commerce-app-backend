const Product = require("../Model/Products");

const addProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      image: req.file.filename,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const { search, category, sort } = req.query;

    const searchTerm = search?.trim();
    const categoryParam = category?.trim();

    let query = {};

    //search
    if (searchTerm) {
      query.name = { $regex: searchTerm, $options: "i" };
    }
    //category
    if (categoryParam) {
      const categories = categoryParam
        .split(",")
        .map((c) => c.trim().toLowerCase());

      query.category = {
        $in: categories.map((cat) => new RegExp(`^${cat}$`, "i")),
      };
    }

    //base query
    let productsQuery = Product.find(query);

    //sorting
    if (sort === "low") {
      productsQuery = productsQuery.sort({ price: 1 });
    } else if (sort === "high") {
      productsQuery = productsQuery.sort({ price: -1 });
    } else {
      productsQuery = productsQuery.sort({ createdAt: -1 });
    }
    const products = await productsQuery;

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  addProduct,
  getProducts,
};
