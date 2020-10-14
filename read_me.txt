The data from pokemons.json file have been stored in 9 separate tables.
pokemons -- main table storing basic info including id, name, maxCP, maxHP, classification, favorite;
body_data -- storing weight, height and fleerate;
pokemon_types -- storing types, resistant, and weaknesses;
types -- a mini table to store types (those stored in pokemon_types.type), being used for querying all types of pokemons;
attacks -- storing attacks related values;
evolutions -- storing evolutions related values, value = null if no previous evolutions/evolutions;
name_id_map -- maping between id and name, using name as primary_key, in the case for querying by name;
special_fields -- storing fields not included in previous tables, i.e. Common Capture Area and Pokémon Class;
favorites -- storing id for pokemons who are marked as favorite, being used when querying with favorite parameter;


set up:
database_setup.js -> tables_generator.js -> data_generator.js


unit test framework: jasmine.






We have provided you with Pokemon data in a json file. Your mission is to create a database and expose the database to a API. Basically, you need to:

Design the database to store information for the Pokemon data

Load the database with the data

Implement the API Interface withe the following features:

Query pokemons with the options:
Pagination
Search by name
Filter by pokemon type
Filter by favorite
Query a pokemon by id
Query a pokemon by name
Query list of pokemon types
Mutation to mark/unmark pokemon as favorite
Tests are important and if time allows it, we'd like to see some test coverage.

Technology
Remember that our technology stack is:

Loopback.io (Javascript and Typescript)
MongoDB / PostgreSQL
Be careful with your decisitions. You can use the framework that you prefer, but please write the challenge in JS or TS. You can choose MongoDB or PostgreSQL like database, be free but take in consideration the best database to store the data provided in the JSON file.