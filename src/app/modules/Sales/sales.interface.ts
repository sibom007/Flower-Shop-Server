import { Types } from 'mongoose';

export type TSale = {
  flowerId?: Types.ObjectId;
  quantitySold: number;
  buyerName: string;
  date: Date;
};

export type TCoupon = {
  CouponCode: string;
  CreateBy: Types.ObjectId;
  CouponDiscount: number;
}
