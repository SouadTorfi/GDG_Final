const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { head } = require("../routes/admin");

class Controller{

    /// Getting All Admins in our website
    getAllAdmins = (req,res,next) =>{
        Admin.find({},(err,response) =>{
           if(err) return next(err);
           res.status(200).send({success:true,response});
       });
   }
    // Update Admin
    updateAdmin = (req,res,next)=>{
        let {id} = req.params || {};
        let body = req.body;
        Admin.updateOne({_id:id},{$set:body},(err,response)=>{
            if(err) return next(err);
            res.status(200).send({success:true,response});
        });
    }
    
    // Delete Admin
     deleteAdmin = (req,res,next)=>{
            let {id} = req.params || {};
             Admin.findByIdAndDelete({_id:id},(err,response)=>{
                if(err) return next(err);
                res.status(200).send({success:true,response});
            });
        }


 // Adding New Admin / Register
 signup = (req,res) => {
    const { name, email, password,phone} = req.body;

    if(!name || !email || !password || !phone){
        res.status(400).json({msg: 'Please enter all fields'});
    }

    Admin.findOne({email})
    .then(admin => {
        if(admin) return res.status(400).json({msg: 'Admin already exists'});

        const newAdmin = new Admin({ name, email, password,phone});

        // Create salt and hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) throw err;
                newAdmin.password = hash;
                newAdmin.save()
                    .then(admin => {
                        jwt.sign(
                            { id: admin._id },
                            process.env.JWT_SECRET_KEY,
                            { expiresIn: 3600 },
                            (err, token) => {
                                if(err) throw err;
                                res.json({
                                    token,
                                    admin: {
                                        id: admin._id,
                                        name: admin.name,
                                        email: admin.email
                                    }
                                });
                            }
                        )
                    });
            })
        })
    })
}

    // Login Function to login as admin
    login = async (req,res) => {
        const { email, password } = req.body;
        if(!email || !password){
            res.status(400).json({msg: 'Please enter all fields'});
        }
        Admin.findOne({email})
            .then(admin => {
                if(!admin) return res.status(400).json({msg: 'Admin does not exist'});
    
                // Validate password
                bcrypt.compare(password, admin.password)
                    .then(isMatch => {
                        if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials'});
    
                        jwt.sign(
                            { id: admin._id },
                            process.env.JWT_SECRET_KEY,
                            { expiresIn: 3600 },
                            (err, token) => {
                                if(err) throw err;
                                res.json({
                                    token,
                                    admin: {
                                        id: admin._id,
                                        name: admin.name,
                                        email: admin.email
                                    }
                                });
                            }
                        )
                    })
            })
    }



    getAdminById = (req,res) => {
    let {id} = req.params;
    Admin.findById(id)
        .then(user => res.json(user))
        .catch(err => console.log(err));
}


}
const controller = new Controller();
module.exports = controller;