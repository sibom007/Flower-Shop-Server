import { Schema, model } from 'mongoose';

const saleSchema = new Schema({
  flowerId: {
    type: Schema.Types.ObjectId,
    ref: 'Flower',
  },
  quantitySold: Number,
  buyerName: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const CouponSchema = new Schema({
  CreateBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  CouponCode: String,
  CouponDiscount: Number,
});




export const salemodel = model('Sale', saleSchema);
export const CouponModel = model('Coupon', CouponSchema);
