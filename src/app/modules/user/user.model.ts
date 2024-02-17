import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import { USER_ROLE } from './user.constant';
import { ObjectId } from 'mongoose';


const userSchema = new Schema<TUser, UserModel>(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    UFpoint: {
      type: Number,
      required: true,
      default: 0
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needPasswordChange: { type: Boolean, },
    role: {
      type: String,
      enum: [USER_ROLE.user, USER_ROLE.manager, USER_ROLE.admin],
    },
    passwordHistory: [
      {
        passwordHash: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

// userSchema.pre('save', async function (next) {
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this; // doc
//   // hashing password and save into DB
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds),
//   );

//   next();
// });

userSchema.post('save', function (doc, next) {
  doc.password = '';
  doc.passwordHistory = [];
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (username: string) {
  return await User.findOne({ username }).select('+password');
};

userSchema.statics.isUserExistsById = async function (
  _id: ObjectId | undefined,
) {
  if (!_id) {
    throw new Error('_id cannot be undefined');
  }
  const existingUser = await User.findById({ _id });
  return existingUser;
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>('User', userSchema);
