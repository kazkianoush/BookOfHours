const Memory = require('../models/memoryModel.js')

exports.getAllMemories = (async (req, res, next) => {
  try {
    const [allMemories] = await Memory.getAllMemories();
    res.status(200).json(allMemories);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
});
  
  exports.getMemory = (async (req, res, next) => {
    res.status(200).json({
      status: 'not implemented'
    });
  });
  
  exports.createMemory = (async (req, res, next) => {  
    res.status(201).json({
      status: 'success',
//       data: {
//         tour: newTour
//       }
    });
  });
  
  exports.updateMemory = (async (req, res, next) => {
    // const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // });
  
    // if (!tour) {
    //   return next(new AppError('No tour found with that ID', 404));
    // }
  
    // res.status(200).json({
    //   status: 'success',
    //   data: {
    //     tour
    //   }
    // });
  });
  
  exports.deleteMemory = (async (req, res, next) => {
    // const tour = await Tour.findByIdAndDelete(req.params.id);
  
    // if (!tour) {
    //   return next(new AppError('No tour found with that ID', 404));
    // }
  
    // res.status(204).json({
    //   status: 'success',
    //   data: null
    // });
  });