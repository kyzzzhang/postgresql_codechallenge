const knex = require('../setup/knex.conf')

const { attachPaginate } = require('knex-paginate');
attachPaginate();

function closeConnection() {
    return knex.destroy().then(res => {
        console.log("closed connection")
    }).catch(err => {
        console.log("getting error when close connection")
    })
}

async function queryById (pokemon_id) {
    const resp = await knex('pokemons').select('*')
        .where('pokemons.id', pokemon_id)
        .leftJoin('body_data', 'pokemons.id', 'body_data.id')
        .leftJoin('pokemon_types', 'pokemons.id', 'pokemon_types.id')
        .leftJoin('attacks', 'pokemons.id', 'attacks.id')
        .leftJoin('evolutions', 'pokemons.id', 'evolutions.id')
        .leftJoin('special_fields', 'pokemons.id', 'special_fields.id');
    return resp;
}

async function queryByName(pokemon_name) {
    const id = await knex('name_id_map').select('pokemon_id').where('name', pokemon_name);
    return queryById(id[0].pokemon_id);
}

async function queryPokemonTypes() {
    const types = await knex('types').select('name');
    console.log(types);
    return types;
}

async function favorite(pokemon_id) {
    const [resp1, resp2] = await Promise.all([
        knex('pokemons').update('favorite', true).where('id', pokemon_id),
        mark_fav(pokemon_id)
    ]);
    console.log("favorites pokemon with id " + pokemon_id);
    return resp2[0];
}

async function mark_fav(pok_id) {
    try {
        return await knex('favorites').insert({id: pok_id}).returning('id')
    } catch (err) {
        return [pok_id];
    }
}

async function unfavorite(pokemon_id) {
    const [resp, resp2] = await Promise.all([
        knex('pokemons').update('favorite', false).where('id', pokemon_id),
        knex('favorites').delete().where('id', pokemon_id),
    ])
    if (resp2 === 1) {
        console.log("unfavorites pokemon with id " + pokemon_id);
    } else {
        console.log("pokemon with id " + pokemon_id + " ia already unfavorited");
    }
    return resp2;
}

async function query(name, type, fav) {
    var dataArr =[];
    await knex('pokemons').select('*').where('pokemons.id', function () {
        this.select('pokemon_id').from('name_id_map').where('name_id_map.name', 'like', `%${name}%`)
    })
        .leftJoin('pokemon_types', 'pokemon_types.id', 'pokemons.id')
        .leftJoin('body_data', 'pokemons.id', 'body_data.id')
        .leftJoin('attacks', 'pokemons.id', 'attacks.id')
        .leftJoin('evolutions', 'pokemons.id', 'evolutions.id')
        .leftJoin('special_fields', 'pokemons.id', 'special_fields.id')
        .then(function(result) {
            result.forEach(function(value) {
                if (value.types.includes(type) && value.favorite == fav) {
                    dataArr.push(value)
                }
            });
            // return dataArr;
    });
    return dataArr;
}

async function query_with_options(pagination, name, type, fav) {
    const resp = await query(name, type, fav)
        //.paginate({ perPage: pagination[0], currentPage: pagination[1]});
    return resp;
}


module.exports = {
    closeConnection,
    queryById,
    queryByName,
    queryPokemonTypes,
    favorite,
    unfavorite,
    query_with_options,
    query
}
