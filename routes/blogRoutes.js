import express from "express";
import {
  blogIndex,
  blogDetails,
  blogCreateGet,
  blogCreatePost,
  blogDelete,
} from "../controllers/blogController.js";

const blogRoutes = express.Router();

blogRoutes.get("/create", blogCreateGet);
blogRoutes.get("/", blogIndex);
blogRoutes.post("/", blogCreatePost);
blogRoutes.get("/:id", blogDetails);
blogRoutes.delete("/:id", blogDelete);

export { blogRoutes };
