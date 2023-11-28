const database = require('../utils/database.js').connection;

class PeopleModel {  
    static getAllPeople() {
      return database.promise().query('SELECT * FROM People ORDER BY peopleID ASC');
    }

    static getPersonByName(name) {
      return database.promise().query("SELECT * FROM People WHERE peopleName = ? OR peopleName LIKE ? ORDER BY peopleID ASC", [name, `%${name}%`]);
    }

    static getPersonByID(ID) {
      return database.promise().query("SELECT * FROM People WHERE peopleID = ? OR peopleID LIKE ? ORDER BY peopleID ASC", [ID, `%${ID}%`]);
    }
  


    static create(newPerson) {
      const { personID, personName} = newPerson;
  
      // Perform the database insert
      return database
        .promise()
        .query(
          'INSERT IGNORE INTO Person(personID, personName) VALUES (?, ?)',
          [personID, personName]
        );
    }
};

module.exports = PeopleModel