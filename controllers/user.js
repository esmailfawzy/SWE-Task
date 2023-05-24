import user from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerform =  (req, res)=> {
    res.render('authentication/register');
}

export const register = async  (req,res) =>{

    const {username,email,password,academicnumber} = req.body;
    console.log(username,email,password,academicnumber);
    const salt = bcrypt.genSaltSync(10);
    const encryptedpassword = bcrypt.hashSync(password, salt);
    await user.create({username, email, password: encryptedpassword, academicnumber})
    res.redirect('/login');
}

export const loginform = (req, res)=> {
    res.render('authentication/login');
}

export const login = async (req,res) =>{

    const {email,password,academicnumber} = req.body;


    const loggedUser = await user.findOne({email});

    const isCorrectPassword = bcrypt.compareSync(password, loggedUser.password);
    if(!isCorrectPassword){
        return res.send('Incorrect Credentials');
    }

    const data = {

        _id: loggedUser._id,
        email: loggedUser.email,
    };

    const jwtToken = jwt.sign(data, process.env.JWT_SECRET);
    console.log(jwtToken);

    res.cookie('token', jwtToken);
    res.send('logged in');
};