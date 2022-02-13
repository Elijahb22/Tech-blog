const router = require('express').Router();
const { User } = require('../../models');

//Create a new user
router.post("/", async (req, res) => {
try {
  const userData = await User.create(req.body);
  req.session.save(() => {
    req.session.logged_in = true;
    req.session.user_id = userData.id;
    res.status(200).json(userData);
  });
} catch (err) {
  res.status(500).json(err)
}
});

module.exports = router; 