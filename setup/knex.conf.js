const config = {
    user: "postgres",
    host: "localhost",
    password: "123456",
    port: 5433,
    database: 'pokemon_db'
};

const knex = require('knex')({
    client: 'pg',
    connection: config
});

module.exports = knex;


