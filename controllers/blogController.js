import { Blog } from "../models/blog.js";

const blogIndex = async (req, res) => {
  try {
    const result = await Blog.find().sort({ createdAt: -1 });
    res.render("index", { blogs: result, title: "Blogs" });
  } catch (err) {
    console.log(err);
  }
};

const blogDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Blog.findById(id);
    res.render("details", { blog: result, title: "Blog Details" });
  } catch (err) {
    console.log(err);
  }
};

const blogCreateGet = (req, res) => {
  res.render("create", { title: "Create a new blog" });
};

const blogCreatePost = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.redirect("/blogs");
  } catch (error) {
    console.log(error);
  }
};

const blogDelete = async (req, res) => {
  try {
    const id = req.params.id;
    await Blog.findByIdAndDelete(id);
    res.json({ redirect: "/blogs" });
  } catch (error) {
    console.log(err);
  }
};

export { blogIndex, blogDetails, blogCreateGet, blogCreatePost, blogDelete };
