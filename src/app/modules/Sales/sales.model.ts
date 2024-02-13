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

export const salemodel = model('Sale', saleSchema);
