const express = require('express')
const router = require("express").Router();

const {tripListing, wishlistListing, reservationListing, propertyListing} = require('../controllers/userListings')
const verifyToken = require('../middleware/authMiddleware');


router.get("/:userId/trips", tripListing)
router.patch("/:userId/:listingId", wishlistListing)
router.get("/:userId/properties", propertyListing)
router.get("/:userId/reservations", reservationListing)

module.exports = router