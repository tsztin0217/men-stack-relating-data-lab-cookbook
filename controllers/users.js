const express = require('express');
const router = express.Router();
const User = require('../models/user.js');


router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.render('users/index.ejs', { users });
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('users/show.ejs', {currentUser, pantry: currentUser.pantry})
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

module.exports = router;
