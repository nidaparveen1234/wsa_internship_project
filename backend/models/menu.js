// we need 
// categories
// inside each categiry class = items
//each item ref to food items
//whole menu belong to that restaurant

const mongoose = require("mongoose");
const menuSchema = new mongoose.Schema({
    menu:[{
        category:{type:String},
        items:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "FoodItem" // refernve to food mmodel
        }]
    }],
    restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant", // Reference to the Restaurant model
    },

},
{
    toJSON: { virtuals: true },//convert dcmt to json and virtual mean make sure it folllows this
    toObject: { virtuals: true }
} 
)
const Menu = mongoose.model("Menu",menuSchema);
module.exports = Menu;