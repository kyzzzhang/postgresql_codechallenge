const util = require('../lib/methods')

describe('The api mark pokemon as query with parameters', () => {
    it('should return appropriate fields', async function() {
        const resp = await util.query("Art", 'Flying', false);
        expect(resp).toEqual(jasmine.objectContaining( [ Object({ id: 144, name: 'Articuno', maxCP: 2776, maxHP: 2978,
            classification: 'Freeze Pokémon', favorite: false, types: [ 'Ice', 'Flying' ], resistant: [ 'Grass', 'Ground', 'Bug' ],
            weaknesses: [ 'Fire', 'Electric', 'Rock', 'Steel' ], weight: [ '48.48kg', '62.33kg' ], height: [ '1.49m', '1.91m' ],
            fleeRate: 0.1, fast_attacks: [ '{"name":"Frost Breath","type":"Ice","damage":9}' ],
            special_attacks: [ '{"name":"Blizzard","type":"Ice","damage":100}', '{"name":"Ice Beam","type":"Ice","damage":65}', '{"name":"Icy Wind","type":"Ice","damage":25}' ],
            evolutions: null, evolution_requirements_name: null, evolution_requirements_amount: null, 'previous evolution(s)': null,
            'Common Capture Area': null, 'Pokémon Class': 'This is a LEGENDARY Pokémon.' }) ]))
    })
})