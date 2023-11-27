/*
SCRIPT GOES HERE!!
*/

const database = require('../utils/database.js').connection;

class MemoryModel {  
    static getAllMemories() {
      return database.promise().query('SELECT * FROM Memory');
    }

    static getMemory(name) {
      return database.promise().query("SELECT * FROM Memory WHERE memoryName = ? OR memoryName LIKE ?", [name, `%${name}%`]);
    }
  
    static create(newMemory) {
      const { memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather } = newMemory;
  
      // Perform the database insert
      return database
        .promise()
        .query(
          'INSERT IGNORE INTO Memory(memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [memoryID, memoryName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather]
        );
    }
    // static post(item) {
    //   return database.promise().query('INSERT INTO Memory (item) VALUES (?)', [item]);
    // }
  
    static update(memoryName, updatedMemory) {
      const { memoryID, memoryName: updatedName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather } = updatedMemory;

      return database
        .promise()
        .query(
          'UPDATE Memory SET memoryID = ?, memoryName = ?, memorySources = ?, memoryIsSound = ?, memoryIsOmen = ?, memoryIsPersistent = ?, memoryIsWeather = ? WHERE memoryName = ?',
          [memoryID, updatedName, memorySources, memoryIsSound, memoryIsOmen, memoryIsPersistent, memoryIsWeather, memoryName]
        );
    }
    
  
    // static delete(id) {
    //   return database.execute('DELETE FROM groceries WHERE id = ?', [id]);
    // }
};

module.exports = MemoryModel
