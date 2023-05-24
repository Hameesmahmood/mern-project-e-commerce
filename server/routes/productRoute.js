import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  ProductFilterController,
  ProductListController,
  braintreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProdcutPhotoController,
  getProductController,
  getSingleProductController,
  productCountController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// get all products

router.get("/get-product", getProductController);

// single product

router.get("/get-product/:slug", getSingleProductController);

// get photo

router.get("/product-photo/:pid", getProdcutPhotoController);

// delete product

router.delete("/delete-product/:pid", deleteProductController);

//update product

router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// filter products

router.post("/product-filter", ProductFilterController);

//product count
router.get("/product-count", productCountController);

//product per page

router.get("/product-list/:page", ProductListController);

// serach products
router.get("/search/:keyword", searchProductController);

//similar products
router.get("/related-product/:pid/:cid", relatedProductController);

//payments routes
//getting tokken ... from braintree

router.get("/braintree/token", braintreeTokenController);

// payment methods

router.post("/braintree/payment", requireSignIn, braintreePaymentController);
export default router;
