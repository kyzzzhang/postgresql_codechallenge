const knex = require('./knex.conf')
const util = require('../lib/methods')

const json_file = require('../datafile/pokemons.json')
const constants = require('../lib/constants')

async function dataInsertion() {
    for (var i = 0; i < json_file.length; i++) {
        var pokemon_id_val = Number(json_file[i].id);
        await insertAll(json_file[i], pokemon_id_val).then(console.log("data inserted for " + pokemon_id_val));
    }
}

async function insertAll(obj, pok_id) {
    await Promise.all([knex('pokemons').insert({id: pok_id}).returning('id'),
        knex('body_data').insert({id: pok_id}).returning('id'),
        knex('evolutions').insert({id: pok_id}).returning('id'),
        knex('attacks').insert({id: pok_id}).returning('id'),
        knex('special_fields').insert({id: pok_id}).returning('id'),
        knex('pokemon_types').insert({id: pok_id}).returning('id'),
    ]);
    for (var field in obj) {
        if (constants.basic_data.includes(field)) {
            if (field === 'name') {
                await Promise.all([knex('name_id_map').insert({
                    name: obj[field],
                    pokemon_id: pok_id
                }).returning('pokemon_id')]);
            }
            await (knex('pokemons').update(field, obj[field]).where('id', pok_id));
        } else if (constants.body_data.includes(field)) {
            if (field === "weight" || field === "height") {
                var s = new Array();
                for (var key in obj[field]) s.push(obj[field][key]);
                await knex('body_data').update(field, s).where('id', pok_id).returning("*");
            } else await knex('body_data').update(field, obj[field]).where('id', pok_id).returning("*");
        } else if (constants.evolutions_data.includes(field)) {
            if (field === "evolutions" || field === "Previous evolution(s)") {
                var s = new Array();
                for (var key in obj[field]) s.push(obj[field][key]);
                await knex('evolutions').update(field.toLowerCase(), s).where('id', pok_id);
            } else {
                await Promise.all([
                    knex('evolutions').update('evolution_requirements_name', obj[field].name).where('id', pok_id).returning("*"),
                    knex('evolutions').update('evolution_requirements_amount', obj[field].amount).where('id', pok_id).returning("*")
                ]);
            }
        } else if (constants.attacks_data.includes(field)) {
            var s = new Array();
            for (var key in obj[field].fast) s.push(obj[field].fast[key]);
            await knex('attacks').update('fast_attacks', s).where('id', pok_id).returning("*");
            var s2 = new Array();
            for (var key in obj[field].special) s2.push(obj[field].special[key]);
            await knex('attacks').update('special_attacks', s2).where('id', pok_id).returning("*");
        } else if (constants.special_data.includes(field)) {
            await knex('special_fields').update(field, obj[field]).where('id', pok_id).returning("*");
        } else if (constants.types_data.includes(field)) {
            var s = new Array();
            for (var key in obj[field]) {
                const type_name = obj[field][key];
                s.push(type_name);
                if (field === 'types') {
                    async function insertOrUpdate(obj, key, cur_pok_id, sub_table) {
                        try {
                            await Promise.all([knex(sub_table).insert({name: obj[key]}).returning('name')]);
                        } catch (err) {}
                    }
                    await insertOrUpdate(obj[field], key, pok_id, 'types');
                }
                await knex('pokemon_types').update(field, s).where('id', pok_id).returning("*");
            }
        }
    }
}
try {
    dataInsertion().then((res) => util.closeConnection());
} catch (err) {
    util.closeConnection();
}
// module.exports = {
//     dataInsertion
// }