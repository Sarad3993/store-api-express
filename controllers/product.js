const Product = require("../models/product");


// this is for testing purpose 
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({price:{$gt:30,$lt:100}})
  .sort('price')
  // .sort('-price')
  // .sort('name')
  .select('name price')
  // .limit(10)
  // .skip(5)
  res.status(200).json({ products, nOfItems: products.length });
};



// this is actual api
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, selectFields, numericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  // it means if company exists set my property on query object
  if (company) {
    queryObject.company = company;
  }

  if(name){
    queryObject.name = { $regex: name, $options: "i" };
  }

  // numeric filters 
  if(numericFilters){
    const operatorMap = {
      '>':'$gt',
      '>=':'$gte',
      '=':'$e',
      '<':'$lt',
      '<=':'$lte',
    }
    const regEx = /\b(<|>|>=|=|<|<=)\b/g
    let filters = numericFilters.replace(regEx, (match)=>`-${operatorMap[match]}-`)
    // console.log(filters);
    const options = ['price','rating'];
    filters = filters.split(',').forEach((item)=>{
      const [field,operator,value] = item.split('-')
      if(options.includes(field)){
        queryObject[field] = {[operator]:Number(value)}
      }
    })
  }


  console.log(queryObject);

  //sort
  let result = Product.find(queryObject);
  if(sort){
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList)
  }
  else{
    result = result.sort('createdAt')
  }
  //select fields 
  if (selectFields){
    const fieldsList = selectFields.split(',').join(' ')
    result = result.select(fieldsList)
  }

//pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page -1) * limit;
  
  result = result.skip(skip).limit(limit)


  const products = await result 
  res.status(200).json({ products, nOfItems: products.length });
};



module.exports = { getAllProductsStatic, getAllProducts };
