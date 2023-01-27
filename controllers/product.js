const Product = require('../models/product')

const getAllProductsStatic = async (req,res) =>{
    const products = await Product.find({'company':'marcos'})
    res.status(200).json({products, nOfItems:products.length})
}

const getAllProducts = async (req, res) => {
  const {featured} = req.query
  const queryObject = {}
  if(featured){
    queryObject.featured = featured === 'true'? true : false 
  }
  // console.log(queryObject);
  const products = await Product.find(queryObject);
  res.status(200).json({ products, nOfItems: products.length });
};


module.exports = {getAllProductsStatic, getAllProducts}