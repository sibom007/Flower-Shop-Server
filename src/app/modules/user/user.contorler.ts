import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { userservise } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const userdata = req.body;
  const result = await userservise.createUserIntoDB(userdata);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});
const totalUser = catchAsync(async (req, res) => {
  const result = await userservise.TotalUserIntoDB();
  const TotleUser = result.length || 0
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Total User',
    data: TotleUser,
  });
});

const todayUser = catchAsync(async (req, res) => {
  const result = await userservise.TodayUserIntoDB();
  const TodayUser = result.length || 0
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Total User',
    data: TodayUser,
  });
});

export const UserControllers = {
  createUser,
  totalUser,
  todayUser
};
