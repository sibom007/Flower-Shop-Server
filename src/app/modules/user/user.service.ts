import config from '../../config';
import bcrypt from 'bcrypt';
import { USER_ROLE } from './user.constant';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  payload.role = payload.role || USER_ROLE.user || USER_ROLE.manager;
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

export const userservise = {
  createUserIntoDB,
};
