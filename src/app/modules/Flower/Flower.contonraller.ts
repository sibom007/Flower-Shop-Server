import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { Flowerservise } from './Flower.service';
import httpStatus from 'http-status';


const createFlower = catchAsync(async (req, res) => {
  const payload = req.body;
  const userdata = req.user;
  const result = await Flowerservise.createFlowerIntoDB(payload, userdata);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Flower Create successfully',
    data: result,
  });
});

const getallFlower = catchAsync(async (req, res) => {
  const querydata = req.query;
  const result = await Flowerservise.getFlowerIntoDB(querydata);
  // if (result.length === 0) {
  //   throw new AppError(httpStatus.NOT_FOUND,'No matching flowers found.');
  // }
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Flower Find successfully',
    data: result,
  });
});

const updateFlower = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await Flowerservise.updateFlowerIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Flower Resorse Update completed',
    data: result,
  });
});

const deleteFlower = catchAsync(async (req, res) => {
  const  {id}  = req.params;
  const result = await Flowerservise.deleteFlowerFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Flower is deleted succesfully',
    data: result,
  });
});
const BulkDeleteFlower = catchAsync(async (req, res) => {
  const result = await Flowerservise.BulkDeleteFlowersFromDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Flower is deleted succesfully',
    data: result,
  });
});

const alldeleteFlower = catchAsync(async (req, res) => {
  const result = await Flowerservise.alldeleteFlowerFromDB();
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Deleted flower successfully',
    data: result,
  });
});
const getUserFlowerById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await Flowerservise.getUserFlowerbyId(id);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User flower',
    data: result,
  });
});

const getFlowerById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await Flowerservise.getFlowerbyId(id);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'flower',
    data: result,
  });
});
export const FlowerControllers = {
  createFlower,
  getallFlower,
  updateFlower,
  deleteFlower,
  BulkDeleteFlower,
  alldeleteFlower,
  getUserFlowerById,
  getFlowerById,
};
