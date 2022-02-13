const router = require('express').Router();
const { Post , User } = require('../../models');
const Auth = require('../../utils/auth');

router.post('/', Auth, async (req, res) => {
    
    const {title, description} = req.body;
    try {
        const user = await User.findByPk(req.session.user_id);
        if(!user) {
            return res.sendStatus(401);
        } 
        const newPost = await Post.create({
            title, description,
            userId: user.id,
        });
        res.status(200).json(newPost);
      }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router