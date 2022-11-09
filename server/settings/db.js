import mysql from 'mysql2';
import config from '../db/config.js';

const connection = mysql.createConnection({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.NAME
});

connection.connect((error) => {
    if(error) return console.log('An error occurred while connecting to the database');
    else return console.log('The connection to the database was successful');
});


export default connection.promise();