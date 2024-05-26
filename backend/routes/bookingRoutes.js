const express = require('express')
const router = require("express").Router();

const {booking} = require('../controllers/bookingControler')
const verifyToken = require('../middleware/authMiddleware');

router.post("/create", booking)

module.exports = router