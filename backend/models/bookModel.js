const database = require('../utils/database.js').connection;

class BookModel {  
    static getAllBooks() {
      return database.promise().query('SELECT * FROM Book');
    }

    static getAllBooksProjection(selectedColumns) {
      const query = `SELECT ${selectedColumns} FROM Book`
      return database.promise().query(query);
    }

    static getBookProjection(name, selectedColumns) {
      const query = `SELECT ${selectedColumns} FROM Book WHERE bookName = ? OR bookName LIKE ?`
      return database.promise().query(query, [name, `%${name}%`]);
    }

    static getBookByName(name) {
      return database.promise().query('SELECT * FROM Book WHERE bookName = ? OR bookName LIKE ?', [name, `%${name}%`]);
    }

    static getBookByID(ID) {
      return database.promise().query('SELECT * FROM Book WHERE bookID = ?', [ID]);
    }

    static getBookByMemory(memoryID) {
      return database.promise().query('SELECT * FROM Book b WHERE b.memoryID = ?', [memoryID]);
    }

    static getBookByMemoryGroupBy(memoryID, group) {
      const query = `SELECT b.${group}, COUNT(*) as bookCount FROM Book b WHERE b.memoryID = ? GROUP BY b.${group}`
      console.log(query)
      return database.promise().query(query, [memoryID]);
    }
  
    static async post(input) {
      // handle id increment
      const [latestBookEntry] = await database.promise().query('SELECT bookID FROM Book ORDER BY bookID DESC LIMIT 1')
      const newID = parseInt(latestBookEntry[0].bookID.slice(2,5)) + 1
      const newBookID = `BK${String(newID).padStart(3, '0')}`

      return database.promise().query('INSERT INTO Book(bookID, bookName, language, aspectID, memoryID, elementOfTheSoulID, numenID) VALUES (?, ?, ?, NULL, ?, NULL, NULL)'
      , [newBookID, input.bookName, input.language, input.memoryID]);
    }
  
    static async update(bookID, updatedData) {
      const updateColumns = Object.keys(updatedData)
          .map(column => `${column} = ?`)
          .join(', ');

      const updateQuery = `UPDATE Book SET ${updateColumns} WHERE bookID = ?`;

      const values = [...Object.values(updatedData), bookID];

      return database.promise().query(updateQuery, values);
  }
  
    // static delete(id) {
    //   return database.execute('DELETE FROM groceries WHERE id = ?', [id]);
    // }
};

module.exports = BookModel