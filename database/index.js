const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/photos', { useNewUrlParser: true, useCreateIndex: true });
// mongoose.connect('mongodb://172.17.0.3/photos', { useNewUrlParser: true, useCreateIndex: true });

// Schema
const listingSchema = mongoose.Schema({
  listingID: { type: Number, unique: true },
  listingDesc: String,
  isSaved: Boolean,
  listingPhotos: [{ url: String, desc: String, isVerified: Boolean }],
});

// Listing model
const Listing = mongoose.model('Listing', listingSchema);

// Get photos from DB.
const getPhotos = (targetID, callback) => {
  Listing.find({ listingID: targetID }, (err, photos) => {
    if (err) {
      callback(err);
    } else {
      callback(null, photos);
    }
  });
};

module.exports = {
  Listing,
  getPhotos,
};
