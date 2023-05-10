const Tour_m = require('./../model/tourModel');
const APIfeatures = require('./../utils/APIfeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  next();
};

exports.getAllTours = catchAsync(async (req, res, next) => {
  // execution
  const features = new APIfeatures(Tour_m.find(), req.query)
    .filter()
    .sort()
    .limit()
    .pagination();

  const allTours = await features.query;
  res.json({
    status: 'success',
    data: {
      allTours,
    },
  });
});

// create tour
exports.createTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour_m.create(req.body);
  res.status(201).json({
    message: 'success',
    data: {
      newTour,
    },
  });
});

// get tour by id
exports.getTourById = catchAsync(async (req, res, next) => {
  const newTour = await Tour_m.findById(req.params.id);
  if (!newTour) {
    return next(new AppError('tour not found', 404));
  }
  res.json({
    message: 'success',
    data: {
      newTour,
    },
  });
});

// patch tour
exports.updateTour = catchAsync(async (req, res, next) => {
  const uTour = await Tour_m.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!uTour) {
    return next(new AppError('tour not found', 404));
  }
  res.status(200).json({
    message: 'success',
    data: uTour,
  });
});

// delete tour
exports.deleteTour = catchAsync(async (req, res, next) => {
  const dTour = await Tour_m.findByIdAndDelete(req.params.id);
  if (!dTour) {
    return next(new AppError('tour not found', 404));
  }
  res.status(204).json({
    message: 'success',
    data: 'null',
  });
});

exports.monthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await Tour_m.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        count: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: { _id: 0 },
    },
    {
      $sort: { count: -1 },
    },
  ]);
  res.status(200).json({
    status: 'success',
    plan,
  });
});
