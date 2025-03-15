const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('foods/index.ejs', {
            pantry: currentUser.pantry
        })
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

router.get('/new', async (req, res) => {
    res.render('foods/new.ejs');
})

router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

router.delete('/:itemId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.pantry.id(req.params.itemId).deleteOne();

        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/foods`)
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

router.get('/:itemId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const item = currentUser.pantry.id(req.params.itemId);
        res.render('foods/edit.ejs', {
            item
        })
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

router.put('/:itemId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const item = currentUser.pantry.id(req.params.itemId);
        item.set(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }

})
module.exports = router;