import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Saleservice } from './sales.serviec';

const createSale = catchAsync(async (req, res) => {
  const userdata = req.body;
  const result = await Saleservice.createSaleIntoDB(userdata);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Sales Has successfully',
    data: result,
  });
});
const Weeklysales = catchAsync(async (req, res) => {
  const result = await Saleservice.WeeklysalesInInvontory();
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Sales In Week',
    data: result,
  });
});
const monthlysales = catchAsync(async (req, res) => {
  const result = await Saleservice.MonthlysalesInInvontory();
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Sales In Month',
    data: result,
  });
});
const dailysales = catchAsync(async (req, res) => {
  const result = await Saleservice.DailysalesInInvontory();
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Sales In Day',
    data: result,
  });
});
const Yearlysales = catchAsync(async (req, res) => {
  const result = await Saleservice.YearlysalesInInvontory();
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Sales In Year',
    data: result,
  });
});

export const salecontorler = {
  createSale,
  Weeklysales,
  monthlysales,
  dailysales,
  Yearlysales,
};
