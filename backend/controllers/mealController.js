const Meal = require("../models/meal");

const getAllMeals = async () => {
  try {
    let data = await Meal.find();
    return data;
  } catch (e) {
    console.log(e);
    throw e; // Re-throw the error to be handled by the caller
  }
};

const addNew = async (
  _title,
  _category,
  _description,
  _price,
  _ingrediants,
  _exclude,
  _imageFile,
) => {
  try {
    let data = await Meal.create({
      title: _title,
      category: _category,
      description: _description,
      price: _price,
      ingrediants: _ingrediants,
      exclude: _exclude,
      imageFile: _imageFile,
    });
    return data;
  } catch (e) {
    console.log(e);
    throw e; // Re-throw the error to be handled by the caller
  }
};

const deleteItem = async (_id) => {
  try {
    let data = await Meal.deleteOne({ _id: _id });
    return data;
  } catch (e) {
    console.log(e);
    throw e; // Re-throw the error to be handled by the caller
  }
};

const editItem = async (
  _id,
  _title,
  _category,
  _price,
  _description,
  _imageFile,
) => {
  try {
    let data = await Meal.updateOne(
      { _id: _id },
      {
        $set: {
          imageFile: _imageFile,
          title: _title,
          category: _category,
          description: _description,
          price: _price,
        },
      }
    );
    return data;
  } catch (e) {
    console.log(e);
    throw e; // Re-throw the error to be handled by the caller
  }
};

const getItemById = async (id) => {
  try {
    let data = await Meal.findOne({ _id: id });
    return data;
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

const filterMealsCat = async (_category) => {
  try {
    const data = await Meal.find({ category: _category });
    return data;
  } catch (err) {
    console.log(err);
    throw err; // Re-throw the error to be handled by the caller
  }
};

const filterMealsPri = async (_price) => {
  try {
    let query;
    if (typeof _price === "string") {
      query = { price: _price };
    } else if (Array.isArray(_price)) {
      query = {
        $and: [
          { price: { $gte: _price[0] } },
          { price: { $lte: _price[1] } },
        ],
      };
    }
    const data = await Meal.find(query);
    return data;
  } catch (err) {
    console.log(err);
    throw err; // Re-throw the error to be handled by the caller
  }
};

module.exports = {
  getAllMeals,
  addNew,
  deleteItem,
  editItem,
  filterMealsCat,
  filterMealsPri,
  getItemById,
};
