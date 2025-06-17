const express = require('express');
const router = express.Router();
const userService = require('../services/userServices');

router.post('/login', (req,res) => {
    const response = userService.login(req.body)
})

router.post('/register', (req, res) => {
    const response = userService.register(req.body)
})

module.exports = router;
