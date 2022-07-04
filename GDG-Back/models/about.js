const mongoose = require("mongoose");

const AboutSchema = mongoose.Schema({
    english_paragraph: {
      type: String,
      required: true,
    },
    arabic_paragraph: {
      type: String,
      required: true,
    },
    image:{
      type: Array,
      required: true
    }
},
{ 
  collection: "abouts",
  timestamps: true }
);

const About = mongoose.model("About", AboutSchema);
module.exports = About;