import express from 'express';
import {add_pdf, get_subjects} from "../controllers/doctorController";
const app=express;
const router=app.Router();


router.post('/get_subjects',get_subjects);


router.post('/add_pdf',add_pdf);

export default router;