import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Flowermodel } from '../Flower/Flower.model';
import { TCoupon, TSale } from './sales.interface';
import { CouponModel, salemodel } from './sales.model';
import { User } from '../user/user.model';

const createSaleIntoDB = async (payload: TSale) => {
  const { flowerId, quantitySold, date } = payload;
  const flower = await Flowermodel.findById(flowerId).populate({
    path: 'createdBy',
    select: 'username',
  });
  const buyerName = (flower?.createdBy as any)?.username || 'Unknown'; // Cast createdBy to any type
  if (!flower) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Flower not found');
  }
  if (quantitySold > flower.quantity) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Insufficient stock');
  }
  const sale = {
    flowerId,
    quantitySold,
    buyerName: buyerName,
    date,
  };
  let result;
  if (flower.isDeleted === false) {
    result = await salemodel.create(sale);
  } else {
    throw new AppError(httpStatus.BAD_REQUEST, 'Insufficient stock');
  }
  flower.quantity -= quantitySold;
  if (flower.quantity === 0) {
    await Flowermodel.findByIdAndUpdate(flowerId, { isDeleted: true });
  } else {
    await flower.save(); 
  }
  return result;
};

const WeeklysalesInInvontory = async () => {
  const weeklySale = await salemodel.aggregate([
    {
      $addFields: {
        weekly: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$date',
          },
        },
      },
    },
    {
      $group: {
        _id: '$weekly',
        totalSales: { $sum: '$quantitySold' },
      },
    },
  ]);

  return weeklySale;
};

const MonthlysalesInInvontory = async () => {
  const monthlySale = await salemodel.aggregate([
    {
      $addFields: {
        monthly: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$date',
          },
        },
      },
    },
    {
      $group: {
        _id: '$monthly',
        totalSales: { $sum: '$quantitySold' },
      },
    },
  ]);

  return monthlySale;
};

const DailysalesInInvontory = async () => {
  const dailySale = await salemodel.aggregate([
    {
      $addFields: {
        daily: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$date',
          },
        },
      },
    },
    {
      $group: {
        _id: '$daily',
        totalSales: { $sum: '$quantitySold' },
      },
    },
  ]);

  return dailySale;
};

const YearlysalesInInvontory = async () => {
  const yearlySale = await salemodel.aggregate([
    {
      $addFields: {
        year: {
          $dateToString: {
            format: '%Y', // Format the date as 'year'
            date: '$date', // The field representing the date in your document
          },
        },
      },
    },
    {
      $group: {
        _id: '$year', // Group by the new field year
        totalSales: { $sum: '$quantitySold' }, // Sum of quantitySold for each year
      },
    },
  ]);

  return yearlySale;
};

const PointupdateIntoDB = async (id: string, userId: number) => {

  const user = await User.findById(userId)
  const Flower = await Flowermodel.findById(id)

  if (!user || !Flower) {
    throw new Error("User or Flower not found");
  }
  const newUpoint = user.UFpoint + Flower.Fpoint;
  user.UFpoint = newUpoint;
  await user.save();
  return;
};

const CouponIntoDB = async (payload: TCoupon) => {
  const randomNum = Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
  payload.CouponCode = String(randomNum)
  const result = await CouponModel.create(payload);
  return result;
};

const GetCouponIntoDB = async () => {
  const result = await CouponModel.find();
  return result;
};

export const Saleservice = {
  createSaleIntoDB,
  WeeklysalesInInvontory,
  MonthlysalesInInvontory,
  DailysalesInInvontory,
  YearlysalesInInvontory,
  PointupdateIntoDB,
  CouponIntoDB,
  GetCouponIntoDB
};
