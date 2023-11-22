/*
SCRIPT GOES HERE!!
*/

const database = require('../utils/database.js');

class Memory {  
    async getAllMemories() {
      const [allMemories] = await database.connection.query('SELECT * FROM Memory');
      console.log(allMemories)
      return allMemories;
    }

    async getMemory(id) {
      return await database.promise().query('SELECT * FROM Memory WHERE memoryID = ?', [id]);
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

module.exports = Memory