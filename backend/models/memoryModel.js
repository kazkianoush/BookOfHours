/*
SCRIPT GOES HERE!!
*/

const database = require('../utils/database.js');

class MemoryModel {  
    static getAllMemories() {
      return database.runScript('SELECT * FROM Memory');
    }
  
    // static post(item) {
    //   return database.execute('INSERT INTO groceries (item) VALUES (?)', [item]);
    // }
  
    // static update(id, item) {
    //   return database.execute('UPDATE groceries SET item = ? WHERE id = ?', [item, id]);
    // }
  
    // static delete(id) {
    //   return database.execute('DELETE FROM groceries WHERE id = ?', [id]);
    // }
};

module.exports = MemoryModel