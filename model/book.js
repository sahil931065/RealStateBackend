import {Schema, model} from 'mongoose'


const roombook = Schema({
    bookid: Schema.Types.ObjectId,
    name: String,
    email: String,
    sDate: Date,
    eDate: Date,

}, {timestamps: true})


const book = model('book', roombook)
export default book