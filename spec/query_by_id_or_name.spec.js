const util = require('../lib/methods')


describe('The api queryById/name', () => {
    it('should return appropriate fields with "previous evolutions" value not null',  async function() {
        const resp = await util.queryById(15);
        expect(resp).toEqual(jasmine.objectContaining(responseBuilder()))
    })

    it('should return appropriate fields with "previous evolutions" value not null',  async function() {
        const resp = await util.queryByName('Beedrill');
        expect(resp).toEqual(jasmine.objectContaining(responseBuilder()))
    })

    it('should return appropriate fields with "evolutions" value not null',  async function() {
        const resp = await util.queryByName('Growlithe');
        expect(resp).toEqual(jasmine.objectContaining(responseBuilder2()))
    })

    it('should return appropriate fields with "evolutions" value not null',  async function() {
        const resp = await util.queryById(58);
        expect(resp).toEqual(jasmine.objectContaining(responseBuilder2()))
    })

    it('should return appropriate fields with "Common Capture Area" value not null',  async function() {
        const resp = await util.queryById(122);
        expect(resp).toEqual(jasmine.objectContaining(
            [ Object({ id: 122, name: 'Mr. Mime', maxCP: 1345, maxHP: 1494, classification: 'Barrier Pokémon',
                favorate: false, weight: [ '47.69kg', '61.31kg' ], height: [ '1.14m', '1.46m' ], fleeRate: 0.09, types: [ 'Psychic', 'Fairy' ],
                resistant: [ 'Fighting', 'Psychic', 'Dragon' ], weaknesses: [ 'Poison', 'Ghost', 'Steel' ],
                fast_attacks: [ '{"name":"Confusion","type":"Psychic","damage":15}', '{"name":"Zen Headbutt","type":"Psychic","damage":12}' ],
                special_attacks: [ '{"name":"Psybeam","type":"Psychic","damage":40}', '{"name":"Psychic","type":"Psychic","damage":55}', '{"name":"Shadow Ball","type":"Ghost","damage":45}' ],
                evolutions: null, evolution_requirements_name: null, evolution_requirements_amount: null, 'previous evolution(s)': null,
                'Common Capture Area': 'Early reports that this Pokémon is likely to be found in: Western Europe', 'Pokémon Class': null }) ]))
    })

    it('should return appropriate fields with "Pokémon Class" value not null',  async function() {
        const resp = await util.queryById(144);
        expect(resp).toEqual(jasmine.objectContaining(
            [ Object({ id: 144, name: 'Articuno', maxCP: 2776, maxHP: 2978, classification: 'Freeze Pokémon',
                favorate: false, weight: [ '48.48kg', '62.33kg' ], height: [ '1.49m', '1.91m' ], fleeRate: 0.1, types: [ 'Ice', 'Flying' ],
                resistant: [ 'Grass', 'Ground', 'Bug' ], weaknesses: [ 'Fire', 'Electric', 'Rock', 'Steel' ], fast_attacks: [ '{"name":"Frost Breath","type":"Ice","damage":9}' ],
                special_attacks: [ '{"name":"Blizzard","type":"Ice","damage":100}', '{"name":"Ice Beam","type":"Ice","damage":65}', '{"name":"Icy Wind","type":"Ice","damage":25}' ],
                evolutions: null, evolution_requirements_name: null, evolution_requirements_amount: null,
                'previous evolution(s)': null, 'Common Capture Area': null, 'Pokémon Class': 'This is a LEGENDARY Pokémon.' }) ]
        ))
    })


    function responseBuilder() {
        return [ Object({ id: 15, name: 'Beedrill', maxCP: 1301, maxHP: 1439, classification: 'Poison Bee Pokémon',
            favorate: false, weight: [ '25.81kg', '33.19kg' ], height: [ '0.88m', '1.13m' ], fleeRate: 0.06, types: [ 'Bug', 'Poison' ],
            resistant: [ 'Grass', 'Fighting', 'Poison', 'Bug', 'Fairy' ], weaknesses: [ 'Fire', 'Flying', 'Psychic', 'Rock' ],
            fast_attacks: [ '{"name":"Bug Bite","type":"Bug","damage":5}', '{"name":"Poison Jab","type":"Poison","damage":12}' ],
            special_attacks: [ '{"name":"Aerial Ace","type":"Flying","damage":30}', '{"name":"Sludge Bomb","type":"Poison","damage":55}', '{"name":"X Scissor","type":"Bug","damage":35}' ],
            evolutions: null, evolution_requirements_name: null, evolution_requirements_amount: null,
            'previous evolution(s)': [ '{"id":13,"name":"Weedle"}', '{"id":14,"name":"Kakuna"}' ], 'Common Capture Area': null, 'Pokémon Class': null }) ];
    }


    function responseBuilder2() {
        return [ Object({ id: 58, name: 'Growlithe', maxCP: 1199, maxHP: 1335, classification: 'Puppy Pokémon', favorate: false,
            weight: [ '16.63kg', '21.38kg' ], height: [ '0.61m', '0.79m' ], fleeRate: 0.1, types: [ 'Fire' ],
            resistant: [ 'Fire', 'Grass', 'Ice', 'Bug', 'Steel', 'Fairy' ], weaknesses: [ 'Water', 'Ground', 'Rock' ],
            fast_attacks: [ '{"name":"Bite","type":"Dark","damage":6}', '{"name":"Ember","type":"Fire","damage":10}' ],
            special_attacks: [ '{"name":"Body Slam","type":"Normal","damage":40}', '{"name":"Flame Wheel","type":"Fire","damage":40}', '{"name":"Flamethrower","type":"Fire","damage":55}' ],
            evolutions: [ '{"id":59,"name":"Arcanine"}' ], evolution_requirements_name: 'Growlithe candies', evolution_requirements_amount: 50,
            'previous evolution(s)': null, 'Common Capture Area': null, 'Pokémon Class': null }) ];
    }
})