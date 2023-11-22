const Memory = require('../models/memoryModel.js')

exports.getAllMemories = (async (req, res, next) => {
  try {
    // const [allMemories] = await database.promise().query('SELECT * FROM Memory');
    const [allMemories] = await Memory.getAllMemories();
    res.status(200).json(allMemories);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
});
  
exports.getMemory = (async (req, res, next) => {
  try {
    const [memory] = await Memory.getMemory(req.params.id);
    res.status(200).json(memory);
} catch (err) {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
}
});
  
exports.createMemory = (async (req, res, next) => {
  // try {
  //   const body = await request.body({ type: 'json' });
  //   const requestBody = await body.value;
  //   console.log(requestBody.task);
  //   let newTodo = {
  //       task: requestBody.task
  //   };
  //   console.log(newTodo);
  //   await Memory.create(newTodo);
  //   response.status = 200;
  // } catch (err) {
  //   if (!err.statusCode) {
  //     err.statusCode = 500;
  //   }
  // }
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