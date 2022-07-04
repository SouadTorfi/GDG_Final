const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        trim:true,
        lowercase:true,
        unique:true,
    },
    phone:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        minlength: 6,
        required:[true,"Please enter your password"],
    },
    address:{
        region:{
            type:String,
        },
        district:{
            type:String,
        },
        city:{
            type:String,
        },
        street:{
            type:String,
        },
        building:{
            type:String,
        },
        floor:{
            type:String,
        }
    }
},
{
    collection: "users",
    timestamps:true
});
const User = model("User",UserSchema);
module.exports = User;