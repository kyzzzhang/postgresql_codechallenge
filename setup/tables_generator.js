const knex = require('./knex.conf')
const util = require('../lib/methods')

async function createTables() {
    await Promise.all([
        knex.schema.hasTable('pokemons').then(async function (exists) {
            if (!exists) {
                await knex.schema.createTable('pokemons', function (t) {
                    t.integer('id').notNullable().primary();
                    t.string('name');
                    t.integer('maxCP');
                    t.integer('maxHP');
                    t.string('classification');
                    t.boolean('favorite').notNullable().defaultTo(false);
                }).then(console.log('created pokemon table'))
            } else
                // await knex.schema.table('pokemons', function (t) {
                //     t.dropColumn('favorate');
                //     t.boolean('favorite').notNullable().defaultTo(false);
                // }).then(console.log('updated pokemon table'))
               //await knex.schema.dropColumn('favorate').then();

                console.log('pokemons table already exist');
            //await knex.schema.dropTable('pokemons').then()
        }),
        knex.schema.hasTable('name_id_map').then(async function (exists) {
            if (!exists) {
                await knex.schema.createTable('name_id_map', function (t) {
                    t.string('name').notNullable().primary();
                    t.integer('pokemon_id').unsigned().references('id').inTable('pokemons');
                }).then(console.log('created name_id_map table'))
            } else
                console.log('name_id_map table already exist');
            //await knex.schema.dropTable('name_id_map').then()
        }),
        knex.schema.hasTable('special_fields').then(async function (exists) {
            if (!exists) {
                await knex.schema.createTable('special_fields', function (t) {
                    t.integer('id').notNullable().primary();
                    t.string('Common Capture Area');
                    t.string('Pokémon Class');
                }).then(console.log('created special_fields table'))
            } else
                console.log('special_fields table already exist');
            //await knex.schema.dropTable('special_fields').then()
        }),
        knex.schema.hasTable('evolutions').then(async function (exists) {
            if (!exists) {
                await knex.schema.createTable('evolutions', function (t) {
                    t.integer('id').notNullable().primary();
                    t.specificType('evolutions', 'text[]');
                    t.string('evolution_requirements_name');
                    t.integer('evolution_requirements_amount');
                    t.specificType('previous evolution(s)', 'text[]');
                }).then(console.log('created evolutions table'))
            } else
                console.log('evolutions table already exist');
            //await knex.schema.dropTable('evolutions').then()
        }),
        knex.schema.hasTable('body_data').then(async function (exists) {
            if (!exists) {
                await knex.schema.createTable('body_data', function (t) {
                    t.integer('id').notNullable().primary();
                    t.specificType('weight', 'text[2]');
                    t.specificType('height', 'text[2]');
                    t.double('fleeRate');
                }).then(console.log('created body_data table'))
            } else
                console.log('body_data table already exist');
            //await knex.schema.dropTable('body_data').then()
        }),
        knex.schema.hasTable('types').then(async function (exists) {
            if (!exists) {
                await knex.schema.createTable('types', function (t) {
                    t.string('name').unique().notNullable().primary();
                }).then(console.log('created types table'))
            } else
                console.log('types table already exist');
            //await knex.schema.dropTable('types').then()
        }),

        knex.schema.hasTable('pokemon_types').then(async function (exists) {
            if (!exists) {
                await knex.schema.createTable('pokemon_types', function (t) {
                    t.integer('id').notNullable().primary();
                    t.specificType('types', 'text[]');
                    t.specificType('resistant', 'text[]');
                    t.specificType('weaknesses', 'text[]');
                }).then(console.log('created pokemon_types table'))
            } else
                console.log('pokemon_types table already exist');
            //await knex.schema.dropTable('pokemon_types').then()
        }),
        knex.schema.hasTable('attacks').then(async function (exists) {
            if (!exists) {
                await knex.schema.createTable('attacks', function (t) {
                    t.integer('id').notNullable().primary();
                    t.specificType('fast_attacks', 'text[]');
                    t.specificType('special_attacks', 'text[]');
                }).then(console.log('created attacks table'))
            } else
                console.log('attacks table already exist');
            //await knex.schema.dropTable('attacks').then()
        }),

        knex.schema.hasTable('favorites').then(async function (exists) {
            if (!exists) {
                await knex.schema.createTable('favorites', function (t) {
                    t.integer('id').notNullable().primary();
                }).then(console.log('created favorites table'))
            } else
                console.log('favorites table already exist');
            //await knex.schema.dropTable('favorites').then();
        })
    ]);
}
try {
    createTables().then((res) => util.closeConnection());
} catch (err) {
    util.closeConnection();
}
