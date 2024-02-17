import { Types } from 'mongoose';

export type TFlower = {
  name: string;
  createdBy?: Types.ObjectId;
  color: string;
  price: number;
  quantity: number;
  bloomDate: Date;
  type: string[];
  size: 'big' | 'medium' | 'small';
  fragrance: string;
  Fpoint: number;
  isDeleted: boolean;
};
