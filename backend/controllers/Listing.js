const router = require("express").Router();

const Listing = require("../models/Listing");



/* CREATE LISTING */

const createListing = async(req, res) => {
      const {
        creator,
        category,
        type,
        streetAddress,
        aptSuite,
        city,
        province,
        country,
        guestCount,
        bedroomCount,
        bedCount,
        bathroomCount,
        amenities,
        title,
        description,
        highlight,
        highlightDesc,
        price,
      } = req.body;
      // const user = req.user.id

      const listingPhotos = req.files

      if (!listingPhotos) {
        return res.status(400).send("No file uploaded.")
      }
  
      const listingPhotoPaths = listingPhotos.map((file) => file.path)
      
      const newListing = new Listing({
        listingPhotoPaths,
        creator,
        category,
        type,
        streetAddress,
        aptSuite,
        city,
        province,
        country,
        guestCount,
        bedroomCount,
        bedCount,
        bathroomCount,
        amenities,
        title,
        description,
        highlight,
        highlightDesc,
        price,
      })
      // console.log(user)
      
      await newListing.save()
  
      res.status(200).json(newListing)
    
 
}

/* GET ALL lISTINGS */
const getAllListings = async (req, res) => {
  const qCategory = req.query.category

  try {
    let listings
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate("creator")
    } else {
      listings = await Listing.find().populate("creator")
    }

    res.status(200).json(listings)
  } catch (err) {
    res.status(404).json({ message: "Fail to fetch listings", error: err.message })
    console.log(err)
  }
}

const getSingleListing = async (req, res) => {
  try {
    const { listingId } = req.params
    const listing = await Listing.findById(listingId).populate("creator")
    res.status(202).json(listing)
  } catch (err) {
    res.status(404).json({ message: "Listing can not found!", error: err.message })
  }
}

/* GET lISTINGS BY CATEGORY */
const getListingByCategory = async (req, res) => {
  const qCategory = req
console.log(qCategory)
  try {
    let listings
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate("creator")
    } else {
      listings = await Listing.find().populate("creator")
    }

    res.status(200).json(listings)
  } catch (err) {
    res.status(404).json({ message: "Fail to fetch listings", error: err.message })
    console.log(err)
  }
}

module.exports = {createListing, getAllListings, getSingleListing, getListingByCategory}
