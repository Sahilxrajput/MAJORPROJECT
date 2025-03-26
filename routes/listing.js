const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync"); 
const Listing = require("../models/listing");
const { isLogedIn, isOwner,validateListing } = require("../middleware");
const listingController = require("../controllers/listing");
const multer = require("multer");
const {storage, cloudinary} = require("../cloudConfig");
const upload = multer({ storage});



//Index && Create Route
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLogedIn, 
        upload.single("listing[image]"), 
        validateListing,
        wrapAsync (listingController.createListing)
    );

    
// New route
router.get("/new",isLogedIn,listingController.renderNewForm);

//show, update and delete Route
router.route("/:id")
    .get(wrapAsync (listingController.showListing))
    .put(isLogedIn, isOwner,  upload.single("listing[image]"),  validateListing ,wrapAsync (listingController.updateListing))
    .delete(isLogedIn, isOwner ,wrapAsync (listingController.destroyListing));

// Edit route
router.get("/:id/edit", isLogedIn, isOwner, wrapAsync (listingController.renderEditForm));


 
module.exports = router;