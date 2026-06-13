const mongoose = require("mongoose");
const restaurant = require("./restaurant");
const foodItem = require("./foodItem");

const orderSchema = new mongoose.Schema({
    deliveryInfo:{
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        postalCode:{
            type:String,
            required:true
        },
        phoneNo:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        }
    },
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant',
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    orderItems:[
        {
            name:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            image:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            foodItem:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'FoodItem',
                required:true
            }
        }
    ],
    paymentInfo:{
        id:{
            type:String,
        },
        status:{
            type:String,
        }
    },
    paidAt:{
        type:Date,
    },
    itemsPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    taxPrice:{
        type:Number,
        default:0.0,
    },
    finalTotal: {
        type: Number,
        required: true,
        default: 0.0
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'Processing'
    },
    deliveredAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// stock mangement
// before saving food item 
// 1.check each food item
//2.verify stock
//3.reduce stock
//4.save ordr
//so pre save middleware

//userplace -- backend reciever -- before saving check stock
//reduce and save stock
// return response

orderSchema.pre('save',async function (next){
    try{
        for(const orderItems of this.orderItems){
            const foodItem = await mongoose.model('FoodItem').findById(orderItem.foodItem);
            if (!foodItem) {
                throw new Error("Food item not found");
            }
            if (foodItem.stock < orderItem.quantity) {
                throw new Error(`out of stock! ${orderItem.name}`);
            }
            foodItem.stock -= orderItem.quantity;
            await foodItem.save();
        }
    }catch(error){
        next(error)
    }
    
})
module.exports = mongoose.model("Order", orderSchema);