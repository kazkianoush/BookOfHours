const database = require('../utils/database.js').connection;

class BookModel {  
    static getAllBooks() {
      return database.promise().query('SELECT * FROM Book');
    }

    static getBook(name) {
      return database.promise().query("SELECT * FROM Book WHERE bookName = ? OR bookName LIKE ?", [name, `%${name}%`]);
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

module.exports = BookModel