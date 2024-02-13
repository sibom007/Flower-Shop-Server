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

export const UserControllers = {
  createUser,
};
