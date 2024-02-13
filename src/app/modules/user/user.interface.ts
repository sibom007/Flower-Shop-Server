/* eslint-disable no-unused-vars */
import { Model, ObjectId, Types } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  _id?: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: 'user';
  passwordHistory: {
    passwordHash: string;
    timestamp: Date;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(username: string): Promise<TUser>;
  isUserExistsById(_id: Types.ObjectId | undefined): Promise<TUser | null>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
