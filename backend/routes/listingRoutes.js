const express = require('express')
const router = require("express").Router();
const multer = require("multer");

const {createListing, getAllListings, getSingleListing, getListingByCategory} = require('../controllers/Listing')
const verifyToken = require('../middleware/authMiddleware');
/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use the original file name
    },
  });
  
  const upload = multer({ storage });

//
router.post('/', upload.array("listingPhotos"), createListing)
router.get('/',  getAllListings)
router.get("/:listingId", getSingleListing)
router.get("/category:qCategory", getListingByCategory)


module.exports = router