import { Schema, model } from 'mongoose';
import { TFlower } from './Flower.interfsce';

const FlowerSchema = new Schema<TFlower>(
  {
    name: { type: String, required: true, unique: true },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
    },
    bloomDate: { type: Date, required: true },
    type: { type: [String], required: true },
    size: { type: String, enum: ['big', 'medium', 'small'], required: true },
    fragrance: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

// FlowerSchema.pre('find', function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });

// FlowerSchema.pre('findOne', function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });

export const Flowermodel = model<TFlower>('flower', FlowerSchema);
