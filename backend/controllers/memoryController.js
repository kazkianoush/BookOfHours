const database = require('../database.js');

exports.getAllMemories = (async (req, res, next) => {
    database.runScript('SELECT * FROM Memory').then(result => {
        res.status(200).json({
            status: 'success',
            data: result[0]
          });
      })
      .catch(error => {
        console.error('Error:', error);
      });
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