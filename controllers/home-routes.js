const router = require("express").Router();
const { Blog, Comment, User } = require("../models");
// Import the custom middleware
const withAuth = require("../utils/auth");

// GET all blog for homepage
router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: User
    });

    const blogposts = blogData.map((blog) => {
      return blog.get({ plain: true });
    });
    res.render("homepage", {
      blogposts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one blog
// Use the custom middleware before allowing the user to access the blog
router.get("/blog/:id", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: {
        model: Comment,
        include: User,
      },
    });

    const blogpost = blogData.get({ plain: true });

    res.render("blog", {
      blogpost,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// redirect to form to comment
router.get("/dashboard", async (req, res) => {
  try { 

    if (req.session.loggedIn) {
      const blogData = await Blog.findAll({
        where: {
          user_id: req.session.user_id,
        },
      });

      const blogposts = blogData.map((blog) => {
        return blog.get({ plain: true });
      });

      res.render("dashboard", {
        blogposts,
        loggedIn: req.session.loggedIn
      });
    } else {
      res.render("login");

      const blogData = await Blog.findAll();

      const blogposts = blogData.map((blog) => {
        return blog.get({ plain: true });
      });

      res.render("homepage", {
        blogposts,
        loggedIn: req.session.loggedIn,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//add comment
router.post("/comment", async (req, res) => {
  try {
    const commentData = await Comment.create({
      blog_id: req.body.blog_id,
      user_id: req.session.user_id,
      content: req.body.comment,
    });

    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});
//when new post button is clicked, it will be redirected to the form
router.get("/redirect", (req, res) => {
  try {
    res.redirect("/blog-form");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/blog-form", (req, res) => {
  try {
    res.render("blog-form", {
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//get one blog by id
router.get("/edit/blog-form/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id);

    const blogpost = blogData.get({ plain: true });

    res.render("edit-blog-form", {
      loggedIn: req.session.loggedIn,
      blogpost,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//create new blog
router.post("/blog-form", async (req, res) => {
  try {
    const newBlogData = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlogData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// EDIT FORM
router.put("/blog/edit/:id", async (req, res) => {

  try {
    console.log("Editing a post!");

    const newBlogData = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!newBlogData[0]) {
      res.status(404).json({ message: "No user with this id!" });
      return;
    }
    res.status(200).json(newBlogData);
  } catch (err) {
    console.log(err);

    res.status(400).json(err);
  }
});

//  DELETE a blog
router.delete('/blog/delete/:id', async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      }
    });
    if (!blogData) {
      res.status(404).json({ message: 'No blog!' });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
