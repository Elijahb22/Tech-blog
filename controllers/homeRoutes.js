const router = require('express').Router();
const { User, Comments, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/profile', withAuth, async (req, res) => {
    if (!req.session.logged_in) {
      res.redirect('/');
      return;
    }
    try {
      const user = await User.findByPk(req.session.user_id, {include: "posts"});
      res.render('profile', {
        user: user.toJSON(),
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
});
  
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login');
});

router.get('/signup', async (req, res) =>{
    res.render('signup', {
      logged_in: req.session.logged_in,
    })
});
  
module.exports = router;