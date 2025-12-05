const Listing = require("../models/listing");

//index listings
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render('listings/index.ejs', { allListings });
};

//new listing form
module.exports.renderNewForm = (req, res) => {
    res.render('listings/new.ejs');
};

//show listing
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listingFound = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author", }, }).populate("owner");
    if (!listingFound) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/Listings");
    }
    return res.render('listings/show.ejs', { listingFound });
};

//create listing
module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user.id;
    newListing.image = { url, filename };
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect('/listings');
};

//edit listing
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listingFound = await Listing.findById(id);
    if (!listingFound) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/Listings");
    }
    return res.render('listings/edit.ejs', { listingFound });
};

//update listing
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("update", "Listing Updated!");
    res.redirect('/listings/' + id);
};

//delete listing
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("error", "Listing Deleted!");
    res.redirect('/listings');
};