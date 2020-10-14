const util = require('../lib/methods')

describe('The api mark pokemon as fav/unfav', () => {
    it('should return appropriate fields', async function() {
        const resp = await util.favorite(57);
        expect(resp).toEqual(57);
    })

    it('should return appropriate fields', async function() {
        const resp = await util.unfavorite(57);
        expect(resp).toEqual(1);
    })
})