import { JwtPayload } from 'jsonwebtoken';
import { User } from '../user/user.model';
import { TFlower } from './Flower.interfsce';
import { Flowermodel } from './Flower.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
const createFlowerIntoDB = async (payload: TFlower, userdata: JwtPayload) => {
  const user = await User.findOne({ username: userdata.username });
  payload.createdBy = user?._id;
  payload.isDeleted = false;
  const result = Flowermodel.create(payload);
  return result;
};

const getFlowerIntoDB = async (filters: Record<string, any>) => {
  const query: any = { isDeleted: false };


  if (filters.price) {
    if (!isNaN(filters.price)) {
      query.price = filters.price;
    } else {
      throw new Error('Price must be a number');
    }
  }

  if (filters.bloomDate) {
    query.bloomDate = filters.bloomDate;
  }

 

  if (filters.color) {
    const lowercaseColor = filters.color.toLowerCase();
    query.color = lowercaseColor;
  }

  if (filters.type) {
    query.type = { $in: filters.type };
  }

  if (filters.size) {
    query.size = filters.size;
  }

  if (filters.fragrance) {
    query.fragrance = filters.fragrance;
  }




  const result = Flowermodel.find(query).populate({
    path: 'createdBy',
    select: 'username email role updatedAt createdAt',
  });
  return result;
};

// const getFlowerIntoDB = async (filters: Record<string, any>) => {
//   let query = Flowermodel.find({ isDeleted: false });

//   if (filters.color) {
//     query = query.where('color').equals(filters.color);
//   }
//   query.populate({
//     path: 'createdBy',
//     select: 'username email role updatedAt createdAt',
//   });
//   return query;
// };

const updateFlowerIntoDB = async (id: string, payload: Partial<TFlower>) => {
  const result = await Flowermodel.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteFlowerFromDB = async (id: string) => {
  console.log(id);
  const Flowerdata = await Flowermodel.findById(id);
  console.log(Flowerdata);
  const user = await User.isUserExistsById(Flowerdata?.createdBy);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedFlower = await Flowermodel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedFlower) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Flower');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedFlower;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete Flower');
  }
};

const BulkDeleteFlowersFromDB = async (ids: string[]) => {
  const deletedFlowers = [];
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    for (const id of ids) {
      const flowerData = await Flowermodel.findById(id);
      if (!flowerData) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          `Flower with ID ${id} not found`,
        );
      }

      const user = await User.isUserExistsById(flowerData.createdBy);
      if (!user) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          `User for flower with ID ${id} not found`,
        );
      }

      const deletedFlower = await Flowermodel.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true, session },
      );
      if (!deletedFlower) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `Failed to delete flower with ID ${id}`,
        );
      }

      deletedFlowers.push(deletedFlower);
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedFlowers;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete flowers');
  }
};

const alldeleteFlowerFromDB = async () => {
  const query = Flowermodel.find({ isDeleted: true }).populate({
    path: 'createdBy',
    select: 'username email role updatedAt createdAt',
  });
  return query;
};
const getFlowerbyId = async (id: string) => {
  const flowers = await Flowermodel.find({
    _id: id,
    isDeleted: false,
  });
  return flowers;
};
const getUserFlowerbyId = async (userId: string) => {
  const flowers = await Flowermodel.find({
    createdBy: userId,
    isDeleted: false,
  });
  return flowers;
};

export const Flowerservise = {
  createFlowerIntoDB,
  getFlowerIntoDB,
  updateFlowerIntoDB,
  deleteFlowerFromDB,
  BulkDeleteFlowersFromDB,
  alldeleteFlowerFromDB,
  getUserFlowerbyId,
  getFlowerbyId,
};
