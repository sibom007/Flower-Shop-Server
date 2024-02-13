import { Types } from 'mongoose';

export type TSale = {
  flowerId?: Types.ObjectId;
  quantitySold: number;
  buyerName: string;
  date: Date;
};
