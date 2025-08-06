const mysql = require("mysql2/promise");


const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'harzix',
});


    // check connection
    (async () => {
        try {
            const connection = await db.getConnection()
            console.log("Connected to db...")
            connection.release();
        } catch (error) {
            console.log("connect pool failed!", error.message)
        }
    })();

module.exports=db;