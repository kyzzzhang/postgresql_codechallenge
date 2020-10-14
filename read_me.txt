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