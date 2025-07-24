import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

router.post('/', async(req, res)=>{
    try{
        const newContact= new Contact(req.body);
        await newContact.save();

        res.status(201).json({ message: 'Message saved successfully' });
    } catch (err) {
         console.error('Error in /contact route:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;