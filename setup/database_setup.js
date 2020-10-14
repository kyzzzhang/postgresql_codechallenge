var config = {
    user: "postgres",
    host: "localhost",
    password: "123456",
    port: 5433,
};

var knex = require('knex')({
    client: 'pg',
    connection: config
});

knex.raw('CREATE DATABASE pokemon_db')
    .then(function(){
        knex.destroy();
        // connect with database selected
        config.database = 'pokemon_db';
        try {
            knex = require('knex')({ client: 'pg', connection: config});
            console.log("database is created and connected");
        } finally {
            knex.destroy();
        }

    });