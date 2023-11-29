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

    static getAllVisitors() {
      return database.promise().query(
      `SELECT p.peopleName, s.skillName as language
      FROM Visitor v, Language l, Skill s, People p
      WHERE v.languageID = l.languageID
      AND v.visitorID = p.peopleID
      AND s.skillID = l.languageID;`
      )
    }

    static getVisitorByName(name) {
      return database.promise().query(
        `SELECT p.peopleName, s.skillName as language
        FROM Visitor v, Language l, Skill s, People p
        WHERE v.languageID = l.languageID
        AND v.visitorID = p.peopleID
        AND s.skillID = l.languageID
        AND p.peopleName LIKE ?;`, [`%${name}%`]
        )
    }

    static getNonLanguageTeachingVisitors() {
      return database.promise().query(
      `SELECT p.peopleName
      FROM Visitor v, People p
      WHERE NOT EXISTS (
          SELECT 1
          FROM Language l
          WHERE l.languageID != v.languageID
      ) AND v.visitorID = p.peopleID;`
      )
    }

    static getUniqueLanguageVisitor() {
      return database.promise().query(
      `SELECT v.languageID, COUNT(p.peopleName)
      FROM Visitor v, People p
      WHERE v.visitorID = p.peopleID AND v.languageID IS NOT NULL
      GROUP BY v.languageID
      HAVING COUNT(*) < 2;`
      )
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