import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  updateProductController,
  brainTreePaymentController,
  braintreeTokenController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-event",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
router.put(
    "/update-event/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
  );
//routes
router.get("/get-event", getProductController);

//single product
router.get("/get-event/:slug", getSingleProductController);

//get photo
router.get("/event-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/event/:pid", deleteProductController);
router.post("/event-filters", productFiltersController);

//product count
router.get("/event-count", productCountController);

//product per page
router.get("/event-list/:page", productListController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;