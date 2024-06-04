const router = require('express').Router();
const { Blog, Comment } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all galleries for homepage
router.get('/', async (req, res) => {
  try {
    
    const blogData = await Blog.findAll();


    const blogposts = blogData.map(blog => {
      return blog.get({ plain: true })
    })


    // const galleries = dbGalleryData.map((gallery) =>
    //   gallery.get({ plain: true })
    // );

    res.render('homepage', {
      blogposts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one gallery
// Use the custom middleware before allowing the user to access the gallery
router.get('/blog/:id', withAuth, async (req, res) => {
  try {

    const blogData = await Blog.findByPk(req.params.id, {
      include: Comment
    });


    const blogpost = blogData.get({ plain: true });

    console.log(blogpost)

    res.render('blog', { 
      blogpost, 
      loggedIn: req.session.loggedIn 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one painting
// Use the custom middleware before allowing the user to access the painting
router.get('/painting/:id', withAuth, async (req, res) => {
  try {
    const dbPaintingData = await Painting.findByPk(req.params.id);

    const painting = dbPaintingData.get({ plain: true });

    res.render('painting', { painting, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
