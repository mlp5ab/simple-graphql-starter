import config from '../config/index';
const fetch = require('node-fetch');

const getOwnedGames = steamId =>
    new Promise(async (resolve, reject) => {
        const url = `${config.steam.url}/IPlayerService/GetOwnedGames/v0001?key=${config.steam.apiKey}&steamid=${steamId}&format=json`;

        try {
            const res = await fetch(url);

            if (res.status !== 200) {
                throw new Error('Response from server not successful');
            }

            const body = await res.json();
            resolve(body.response.games);
        } catch (e) {
            console.log(e);
            reject('Unable to access steam api');
        }
    });

export default getOwnedGames;
