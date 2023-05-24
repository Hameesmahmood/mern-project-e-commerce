import CategoryModel from "../models/CategoryModel.js";
import slugify from "slugify";
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({ message: "Category already exists" });
    }

    const category = await new CategoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "New category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error creating category",
    });
  }
};

//Update Category

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res
      .status(201)
      .send({ success: true, message: "Category updated", category });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error updating category", error });
  }
};

//get all categories

export const categoryController = async (req, res) => {
  try {
    const category = await CategoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All categories list",
      category,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, error, message: "Error getting categories" });
  }
};

//Single Category

export const singleCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Single category Successfull ",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500),
      send({ success: false, error, message: "Error getting category" });
  }
};

//Delete Category

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await CategoryModel.findByIdAndDelete(id);
    res
      .status(200)
      .send({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, error, message: "Error deleting category" });
  }
};
