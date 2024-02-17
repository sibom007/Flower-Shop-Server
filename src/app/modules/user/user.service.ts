import config from '../../config';
import bcrypt from 'bcrypt';
import { USER_ROLE } from './user.constant';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  payload.role = payload.role || USER_ROLE.user || USER_ROLE.manager || USER_ROLE.admin;
  payload.password = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );

  payload.needPasswordChange = true
  const currentTime = new Date();
  const passwordHistoryObj = {
    passwordHash: payload.password,
    timestamp: currentTime,
  };
  payload.passwordHistory = [passwordHistoryObj];
  const result = User.create(payload);
  return result;
};

const UpdateUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result;
};



const SingleUserIntoDB = async (id:string) => {
  const result = User.findById(id);
  return result;
};
const TotalUserIntoDB = async () => {
  const result = User.find();
  return result;
};

const TodayUserIntoDB = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const result = await User.find({
    createdAt: {
      $gte: today,
    }
  });
  return result;
};



export const userservise = {
  createUserIntoDB,
  TotalUserIntoDB,
  TodayUserIntoDB,
  UpdateUserIntoDB,
  SingleUserIntoDB
};
