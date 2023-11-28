const Numen = require("../models/numenModel");

exports.getAllNumen = (async (req, res, next) => {
    try {
      const [allNumenEntry] = await Numen.getAllNumen();
      console.log(allNumenEntry);
      const allNumen = [];
      await Promise.all(allNumenEntry.map(async (numen) => {
        numenName = await Numen.getNumenName(numen.numenID)
        allNumen.push({"memoryID": numenName[0][0].memoryID, 
                        "memoryName": numenName[0][0].memoryName,
                        "memorySources": numenName[0][0].memorySources,
                        "memoryIsSound": numenName[0][0].memoryIsSound,
                        "memoryIsOmen": numenName[0][0].memoryIsOmen,
                        "memoryIsPersistent": numenName[0][0].memoryIsPersistent,
                        "memoryIsWeather": numenName[0][0].memoryIsWeather});
      }))
      res.status(200).json(allNumen);
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
    }
  });
    
  exports.getNumenByID = (async (req, res, next) => {
    try {
      const [numen] = await Numen.getNumenByID(req.params.name);
      res.status(200).json(numen);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
  });
  
  exports.getNumenByBookID = (async (req, res, next) => {
    try {
      const [numen] = await Numen.getNumenByBookID(req.params.id);
      res.status(200).json(numen);
    } catch (err) {
        if (!err.statusCode) {
        err.statusCode = 500;
        }
    }});

exports.getNumenName = (async (req, res, next) => {
    try {
        const [numen] = await Numen.getNumenName(req.params.id);
        res.status(200).json(numen);
    } catch (err) {
        if (!err.statusCode) {
        err.statusCode = 500;
        }}});

exports.getBookNameFromNumen = (async (req, res, next) => {
    try {
        const [numen] = await Numen.getBookNameFromNumen(req.params.id);
        res.status(200).json(numen);
    } catch (err) {
        if (!err.statusCode) {
        err.statusCode = 500;
        }}});