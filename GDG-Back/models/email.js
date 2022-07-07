const { Schema, model } = require("mongoose");

const EmailSchema = new Schema({

    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique:true,
        trim:true,
        lowercase:true
    },
},
{
    collection: "emails",
    timestamps:true
});
const Email = model("Email",EmailSchema);
module.exports = Email;