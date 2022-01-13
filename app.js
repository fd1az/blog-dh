import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import { blogRoutes } from "./routes/blogRoutes.js";
import dotenv from "dotenv";
//Load env vars
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
app.use("/blogs", blogRoutes);
// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
