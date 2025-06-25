import {Schema, model} from 'mongoose'


const contactus = Schema({
    userid: Schema.Types.ObjectId,
    name: String,
    email: String,
    message: String
}, {timestamps: true})


const contact = model('contact', contactus)
export default contact