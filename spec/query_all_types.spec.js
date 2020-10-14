const util = require('../lib/methods')

describe('The api query types', () => {
    it('should return appropriate fields', async function() {
        const resp = await util.queryPokemonTypes();
        expect(resp.length).toEqual(17);
    })
})