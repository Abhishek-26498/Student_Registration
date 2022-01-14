const dotenv = require('dotenv');
const express = require('express');
const Student = require('./models/student');
const path = require('path');
const { ok } = require('assert');
const app = express();

const staticPath = path.join(__dirname, './public');

app.use('/',express.static(staticPath));


//add path of dotenv file 
dotenv.config({path:'./config.env'});


//db require from db folder
require('./db/conn');


//Add PORT No using dotenv
const PORT = process.env.PORT;


app.use(express.json());
app.use(express.urlencoded({extended:false}));


// student registeration
// app.post('/students',async(req, res)=>{
//     try{
//         console.log(req.body);
//         const user = new Student(req.body)
//         const createUser = await user.save();
//         res.status(201).send(createUser);
//     }catch(e){res.status(400).send(e);}
// });

app.post('/register', async(req,res)=>{
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        console.log(req.body);
        // res.send(req.body);
        if(password === cpassword){

            const registerStudents = new Student({
                name: req.body.name,
                class: req.body.class,
                rollno: req.body.rollno,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                password: password,
                cpassword: cpassword
            })
           const registered = await registerStudents.save();
           console.log(registered);
           res.status(201).send(registered);

        }else{
            res.send('password are not matching');}
    } catch (error) {
        console.log(error);
        res.status(400).send(error);}
});


//getting students data
app.get('/students',async(req, res)=>{
    try{
        const studentsData = await Student
        // .find({name:"kunal"})
        // .find({class:{$in:["10th","12th"]}})
        // .find({class:{$nin:["10th","12th"]}})
        // .select({rollno:1})
        // .updateOne({name:"test4"}, {$set:{email:"test4@gmail.com"}})
        // .updateMany({class:"12"}, {$set:{class:"10th"}});
        // .sort({"name":-1});
        // .deleteMany({name:"test1"});

        //Aggregation method

        // .aggregate([{$match:{'class':'10th'}}]);
        .aggregate([{$match:{'class':'10th'}},{$project:{name:1,class:1,rollno:1}}]);
        // .aggregate([{$group:{_id:"$class",totalclass:{$sum:1}}}])
        


     

        console.log(studentsData)
        res.send(studentsData);
    }catch(e){ res.send(e);}
});

//getting individual student data
app.get('/students/:id',async(req, res)=>{
    try{
        const _id = req.params.id;
        const studentData = await Student.findById(_id);
        if(!studentData){
            return res.status(404).send();
        }else{
            res.send(studentData);
        }
    }catch(e){ res.status(404).send(e);}
})



app.listen(PORT,()=>{
    console.log(`Server is running on http:localhost${PORT}`);
});