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

    res.render('homepage', {
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
router.get('/blog/:id', withAuth, async (req, res) => {
  try {
      const blogData = await Blog.findByPk(req.params.id, {
      include: Comment
    });

    const blogpost = blogData.get({ plain: true });

    res.render('blog', { 
      blogpost, 
      loggedIn: req.session.loggedIn 
    });
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

// redirect to form to comment
router.get('/dashboard', async (req, res) => {
  try {
    
    if(req.session.loggedIn){
      res.render('dashboard');
      

    }else{
      res.render('login');
    
    const blogData = await Blog.findAll();

    const blogposts = blogData.map(blog => {
      return blog.get({ plain: true })
    })

    res.render('homepage', {
      blogposts,
      loggedIn: req.session.loggedIn
    });}
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.post('/comment', async(req, res) => {//TODO need current user's info
  // const blogId = req.body.blog_id;
  // const comment=  req.body.comment;
  try{
  const commentData = await Comment.create({
    blog_id: req.body.blog_id,
    user_id: req.session.user_id,
    content: req.body.comment
  });
     
  res.status(200).json(req.user);
  }catch(err){
    res.status(400).json(err);
  }
});

module.exports = router;
