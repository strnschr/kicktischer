const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../db/kicktischer.db');

let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, err => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the kicktischer database.'); 
    }
});

exports.getActivePlayers = async () => {
    const queryString = 'SELECT NAME as name, JOIN_TIME as joinTime, ROWID as rowID FROM ACTIVE_PLAYERS';
    return await queryDatabase(queryString);
};

exports.addPlayer = async (name, userID) => {
    if (userID) {
        // user has previously added himself
        const existingPlayerQuery = 'SELECT * FROM ACTIVE_PLAYERS WHERE ROWID = ' + userID;
        const result = await queryDatabase(existingPlayerQuery);
        if (result.length !== 0) {
            // user is still active in database
            throw {status: 400, msg: 'User is still active'};
        } 
    }

    const timestamp = Date.now();
    const queryString = 'INSERT INTO ACTIVE_PLAYERS (NAME, JOIN_TIME) VALUES ("' + name + '", ' + timestamp + ')';
    await queryDatabase(queryString);
    
    const getIDQueryString = 'SELECT ROWID as rowID FROM ACTIVE_PLAYERS WHERE JOIN_TIME = ' + timestamp;
    const res = await queryDatabase(getIDQueryString);
    return res[0];
};

exports.deletePlayer = async (userID) => {
    const queryString = 'DELETE FROM ACTIVE_PLAYERS WHERE ROWID = ' + userID;
    return await queryDatabase(queryString);
};

const queryDatabase = queryString => {
    return new Promise((resolve, reject) => {        
        db.serialize(() => {
            db.all(queryString, [], (err, rows) => {
              if (err) {
                console.error(err.message);
                reject(err);
              } else {
                resolve(rows);
              }
            });
          });        
    });
};

const closeDatabaseConnection = () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
            reject(err);
        } else {
            console.log('Closed the database connection.');
        }
    });
}

process.on('exit', () => {
    this.closeDatabaseConnection();
    process.exit();
});