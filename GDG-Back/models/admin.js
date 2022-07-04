const { Schema, model } = require("mongoose");

const AdminSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique:true,
        trim:true,
        lowercase:true
    },
    password: {
        type: String,
        minlength: 6,
        required:[true,"Please enter your password"],
    },
    phone:{
        type: String,
        required:true,
        trim: true,
        unique:true
    }
},
{
    collection: "admins",
    timestamps:true
});
const Admin = model("Admin",AdminSchema);
module.exports = Admin;