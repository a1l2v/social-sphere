import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
    clubController,
    
    createClubController,
    clubPhotoController
  } from "./../controllers/clubController.js";
import formidable from "express-formidable";

const router = express.Router();

router.post(
  "/create-club",
  requireSignIn,
  isAdmin,
  formidable(),
  createClubController
);



//getALl club
router.get("/get-club", clubController);

router.get("/club-photo/:pid", clubPhotoController);


export default router;