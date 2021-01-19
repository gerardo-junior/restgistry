module.exports = require('mysql2').createPool({
    host:  'db',
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    timezone: 'UTC'
});