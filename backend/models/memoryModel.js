/*
SCRIPT GOES HERE!!
*/

const database = require('../utils/database.js').connection;

class Memory {  
    static getAllMemories() {
      return database.promise().query('SELECT * FROM Memory');
    }

    static getMemory(name) {
      return database.promise().query('SELECT * FROM Memory WHERE memoryName = ?', [name]);
    }
  
    // static post(item) {
    //   return database.promise().query('INSERT INTO Memory (item) VALUES (?)', [item]);
    // }
  
    // static update(id, item) {
    //   return database.execute('UPDATE groceries SET item = ? WHERE id = ?', [item, id]);
    // }
  
    // static delete(id) {
    //   return database.execute('DELETE FROM groceries WHERE id = ?', [id]);
    // }
};

module.exports = Memory