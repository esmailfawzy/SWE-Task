import express from "express";
import { engine } from 'express-handlebars';
import mongoose from "mongoose";
import dotenv from 'dotenv'
import MethodOverride from "method-override";
dotenv.config()

mongoose.connect(process.env.mongoConnectionUrl)

import subjectRouter from './routes/subjects.js'

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(MethodOverride('_method'))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './templates'); 

app.use('/subjects', subjectRouter)
app.listen(process.env.port, () => {
    console.log(`Started the app on http://localhost:${process.env.port}`)
})


