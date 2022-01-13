import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import { Blog } from "./models/blog.js";
import dotenv from "dotenv";

// load env vars
dotenv.config();
// express app
const app = express();

// connect to mongodb & listen for requests

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "Nosotros" });
});

// blog routes
app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Crear nuevo blog" });
});

app.get("/blogs", async (req, res) => {
  try {
    const result = await Blog.find().sort({ createdAt: -1 });
    res.render("index", { blogs: result, title: "Blogs" });
  } catch (error) {
    console.log(error);
  }
});

app.post("/blogs", async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.redirect("/blogs");
  } catch (error) {
    console.log(error);
  }
});

app.get("/blogs/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Blog.findById(id);
    res.render("details", { blog: result, title: "" });
  } catch (error) {
    console.log(err);
  }
});

app.delete("/blogs/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Blog.findByIdAndDelete(id);
    res.json({ redirect: "/blogs" });
  } catch (error) {
    console.log(error);
  }
});

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
