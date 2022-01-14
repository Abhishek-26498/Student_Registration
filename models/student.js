const mongoose = require('mongoose');
const validate = require('validator');

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    class:{
        type:String,
        required:true
    },
    rollno:{
        type: Number,
        required:true,
        unique:[true,'Roll No is already present']
    },
    email:{
        type:String,
        required:true,
        unique:[true,'Email is already present'],
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    }, 

    
    // validate: {
    //     validator(value){
    //         if(!validator.isEmail(value)){
    //             throw new Error("Invalid Email")
    //         }
    //     }
    //     }
    // },

    
    phone:{
        type:Number,
        required:true,
        unique:true,
        min:10
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }
});

const Student = new mongoose.model('Student',studentSchema);

module.exports=Student;