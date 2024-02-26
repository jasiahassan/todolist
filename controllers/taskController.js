const Task = require("../models/taskModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const apiFeatures = require("../utils/apiFeatures");


exports.createTask = catchAsync(async (req, res, next) => {
  const newtask = await Task.create({
    ...req.body,
    userId: req.user.id,
  });
  res.status(201).json({
    status: "success",
    data: {
      task: newtask,
    },
  });
});

exports.getTasks = catchAsync(async (req, res, next) => {
  let features;
  if (req.user.role === "user") {
    features = new apiFeatures(Task.find({ userId: req.user._id }), req.query)
      .filter()
      .sort();
  }
  if (req.user.role === "admin") {
    features = new apiFeatures(Task.find(), req.query).filter().sort();
  }

  const tasks = await features.query;
  if (tasks.length == 0) {
    return next(new AppError("No tasks found for this user", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      tasks,
    },
  });
});

exports.updateTask = catchAsync(async (req, res, next) => {
  let updatedTask;
  updatedTask = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedTask) {
    return next(new AppError("no task found for this user with this id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      updatedTask,
    },
  });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    return next(new AppError("no task found for this user", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
