
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

var productSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    priceUni: { type: Number, required: [true, 'The unitary price is required'] },
    description: { type: String, required: false },
    img: { type: String, required: false },
    available: { type: Boolean, required: true, default: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});


module.exports = mongoose.model('Product', productSchema);