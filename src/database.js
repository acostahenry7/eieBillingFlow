const {Client} = require('pg');

connection = {
  user: 'postgres',
  host: 'localhost',
  password: 'postgres',
  database: 'eieBillingFlow',
  port: '5432'
}

  module.exports = (client) => {

    return client = new Client(connection);

  }
