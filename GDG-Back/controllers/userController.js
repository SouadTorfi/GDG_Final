const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { head } = require("../routes/user");

class Controller{
    // Getting All Users in our websites
    getAllUsers = async(req,res) => {
        let users;
        try{
            users = await User.find();
        }
        catch(err){
            console.log(err);
        }
        if(!users){
            return res.status(404).json({message:"No Users Found"})
        }
        return res.status(200).json({users});
        }
    // update User
    updateUser = async(req,res) => {
        let {id} = req.params || {};
        const {name,email,phone,password,address} = req.body;
        let user;
        try{
            user = await User.findByIdAndUpdate(id,{
                name, 
                email,
                phone,
                password,
                address
            });
            user.save();
        }
        catch(err){
            console.log(err);
        }
    
        if(!user){
            return res.status(404).json({message:"Cannot Update User"})
        }
        return res.status(200).json({user})
    }

    // Delete User
    deleteUser = async(req,res) => {
        let {id} = req.params || {};
        let user;
        try{
            user = await User.findByIdAndDelete(id);
        }
        catch(err){
            console.log(err);
        }
        if(!user){
            return res.status(404).json({message:"Cannot Deleted User"});
        }
        return res.status(200).json({message:"User deleted Successfully"});
    }

    // JWT Functions Sign Up And Login
    signup = (req,res) => {
        const { name, email, password,phone} = req.body;
    
        if(!name || !email || !password || !phone){
            res.status(400).json({msg: 'Please enter all fields'});
        }
    
        User.findOne({email})
        .then(user => {
            if(user) return res.status(400).json({msg: 'User already exists'});
    
            const newUser = new User({ name, email, password,phone });
    
            // Create salt and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user._id },
                                process.env.JWT_SECRET_KEY,
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user._id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    });
                                }
                            )
                        });
                })
            })
        })
    }
    login = async (req,res) => {
        const { email, password } = req.body;
        if(!email || !password){
            res.status(400).json({msg: 'Please enter all fields'});
        }
        User.findOne({email})
            .then(user => {
                if(!user) return res.status(400).json({msg: 'User does not exist'});
    
                // Validate password
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials'});
    
                        jwt.sign(
                            { id: user._id },
                            process.env.JWT_SECRET_KEY,
                            { expiresIn: 3600 },
                            (err, token) => {
                                if(err) throw err;
                                res.json({
                                    token,
                                    user: {
                                        id: user._id,
                                        name: user.name,
                                        email: user.email
                                    }
                                });
                            }
                        )
                    })
            })
    }
    getUserById = (req,res) => {
        let {id} = req.params;
        User.findById(id)
            .select('-password')
            .then(user => res.json(user));
    }

}
const controller = new Controller();
module.exports = controller;