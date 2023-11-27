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
    const [memory] = await Memory.getMemory(req.params.name);
    res.status(200).json(memory);
} catch (err) {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
}
});
  

// Example memoryController.js

// ... (existing code)

exports.createMemory = async (req, res, next) => {
  try {
    const { memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather } = req.body;

    // Validate the incoming data as needed

    // Create an object with the user input
    const newMemory = {
      memoryID,
      memoryName,
      memorySources,
      memoryIsSound,
      memoryIsOmen,
      memoryIsPersistent,
      memoryIsWeather,
    };

    // Call the create method in the MemoryModel
    await Memory.create(newMemory);

    res.status(200).json({ message: 'Memory created successfully' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

// ... (existing code)

exports.updateMemory = async (req, res, next) => {
  try {
    const memoryName = req.params.name;
    const updatedMemory = req.body; // Assuming the updated data is sent in the request body

    // Validate the incoming data as needed

    // Call the update method in the MemoryModel
    await Memory.update(memoryName, updatedMemory);

    res.status(200).json({ message: 'Memory updated successfully' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


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