import { timeStamp } from 'console';
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {type: String, required:true},
  email: {type: String, required: true},
  phone: {type: Number, required:true},
  subject: {type:String, required: true},
  message: {type:String, required: true},
  company: {type: String , required:true},
  reason: {type:String , required:true},
},{timeStamps:true});

const Contact=mongoose.model('Contact', contactSchema);
export default Contact;