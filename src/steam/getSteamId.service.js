import fetch from 'node-fetch';
import config from '../config/index';

const getPlayers = steamUserName =>
    new Promise(async (resolve, reject) => {
        const url = `${config.steam.url}/ISteamUser/ResolveVanityURL/v0001/?key=${config.steam.apiKey}&vanityurl=${steamUserName}`;

        try {
            const res = await fetch(url);

            if (res.status !== 200) {
                throw new Error('Response from server not successful');
            }

            const body = await res.json();

            if (body.response.success === 1) {
                resolve(body.response.steamid);
            } else {
                reject('Unable to find steam id');
            }
        } catch (e) {
            console.log(e);
            reject('Unable to access steam api');
        }
    });

export default getPlayers;
