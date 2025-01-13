import clubModel from "../models/clubModel.js";
import slugify from "slugify";
import fs from "fs";
export const createClubController = async (req, res) => {
    try {
      const { name, description } = req.fields;
      const { photo } = req.files;
      // Validation
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case photo && photo.size > 1000000:
          return res
            .status(500)
            .send({ error: "Photo is Required and should be less than 1MB" });
      }

      const clubs = new clubModel({ ...req.fields, slug: slugify(name) });
          if (photo) {
            clubs.photo.data = fs.readFileSync(photo.path);
            clubs.photo.contentType = photo.type;
          }
          await clubs.save();
          res.status(201).send({
            success: true,
            message: "club Created Successfully",
            clubs,
          });
        } catch (error) {
          console.log(error);
          res.status(500).send({
            success: false,
            error,
            message: "Error in crearing club",
          });
        }
};

export const clubController = async (req, res) => {
  try {
    const club = await clubModel.find({}).select("-photo");
    res.status(200).send({
      success: true,
      message: "All clubs List",
      club,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all clubs",
    });
  }
};



export const clubPhotoController = async (req, res) => {
    try {
      const club = await clubModel.findById(req.params.pid).select("photo");
      if (club.photo.data) {
        res.set("Content-type", club.photo.contentType);
        return res.status(200).send(club.photo.data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr while getting photo",
        error,
      });
    }
  };

    
    
