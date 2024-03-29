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

const PointUpdate = catchAsync(async (req, res) => {
  const { FlowerId } = req.body
  const { userId } = req.body
  await Saleservice.PointupdateIntoDB(FlowerId, userId);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Point update',
    data: null,
  });
});

const couponcreate = catchAsync(async (req, res) => {
  const result = await Saleservice.CouponIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Coupon create successfully ',
    data: result
  });
});

const getcoupon = catchAsync(async (req, res) => {
  const result = await Saleservice.GetCouponIntoDB();
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Coupon Find successfully ',
    data: result
  });
});

const varyfycoupon = catchAsync(async (req, res) => {
  const { CouponCode } = req.params
  const result = await Saleservice.VeryfyCouponIntoDB(CouponCode);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Coupon varyfyed',
    data: result
  });
});

export const salecontorler = {
  createSale,
  Weeklysales,
  monthlysales,
  dailysales,
  Yearlysales,
  PointUpdate,
  couponcreate,
  getcoupon,
  varyfycoupon,
};
