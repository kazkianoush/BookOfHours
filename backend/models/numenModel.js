const database = require('../utils/database.js').connection;

class NumenModel {  
    static getAllNumen() {
      return database.promise().query('SELECT * FROM Numen ORDER BY numenID ASC');
    }

    static getNumenByID(ID) {
      return database.promise().query("SELECT * FROM Numen WHERE numenID = ? ORDER BY numenID ASC", [ID]);
    }
  
    static getNumenByBookID(bookID) {
        return database.promise().query("SELECT * FROM Numen WHERE bookID = ? ORDER BY numenID ASC", [bookID]);
      }
    
    static getNumenName(numenID) {
        return database.promise().query("SELECT * FROM Memory WHERE memoryID = ?", [numenID]);
    }

    static getBookNameFromNumen(numenID) {
        return database.promise().query("SELECT * FROM Book WHERE numenID = ?", [numenID])
    }
};

module.exports = NumenModel