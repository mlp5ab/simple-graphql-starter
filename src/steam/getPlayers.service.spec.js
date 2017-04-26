import getPlayers from './getPlayers.service';

describe('Get Player Data From Steam', () => {
    it('should return a steam id given a steam vanity url', async () => {
        const steamId = await getPlayers('norablindsided');
        return expect(steamId).toBe('76561198048863602');
    });

    it('should reject if the steam id is not found', () =>
        expect(getPlayers('a')).rejects
    );
});
