import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
    clubControlller,
    createclubController,
    deleteclubController,
    singleclubController,
    updateclubController,
  } from "./../controllers/clubController.js";

const router = express.Router();

router.post(
  "/create-club",
  requireSignIn,
  isAdmin,
  createclubController
);

//update club
router.put(
  "/update-club/:id",
  requireSignIn,
  isAdmin,
  updateclubController
);

//getALl club
router.get("/get-club", clubControlller);

//single club
router.get("/single-club/:slug", singleclubController);

//delete club
router.delete(
  "/delete-club/:id",
  requireSignIn,
  isAdmin,
  deleteclubController
);


export default router;