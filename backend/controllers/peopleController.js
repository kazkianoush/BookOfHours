const People = require("../models/peopleModel");


exports.getAllPeople = (async (req, res, next) => {
  try {
    // const [allMemories] = await database.promise().query('SELECT * FROM Memory');
    const [allPeople] = await People.getAllPeople();
    res.status(200).json(allPeople);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
});
  
exports.getPersonByName = (async (req, res, next) => {
  try {
    const [person] = await People.getPersonByName(req.params.name);
    res.status(200).json(person);
} catch (err) {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
}
});

exports.getPersonByID = (async (req, res, next) => {
  try {
    const [person] = await People.getPersonByID(req.params.id);
    res.status(200).json(person);
} catch (err) {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
}
});
  
exports.createPerson = async (req, res, next) => {
  try {
    const { personID, personName} = req.body;

    // Validate the incoming data as needed

    // Create an object with the user input
    const newPerson = {
      personID,
      personName,
    };

    // Call the create method in the PeopleModel
    await People.create(newPerson);

    res.status(200).json({ message: 'Person created successfully' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
  exports.updatePerson = (async (req, res, next) => {
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
  
  exports.deletePerson = (async (req, res, next) => {
    // const tour = await Tour.findByIdAndDelete(req.params.id);
  
    // if (!tour) {
    //   return next(new AppError('No tour found with that ID', 404));
    // }
  
    // res.status(204).json({
    //   status: 'success',
    //   data: null
    // });
  });