const CLIENT_ID = 'f385af34437143eeb2fb7ecba4c421a7';
const CLIENT_SECRET = '1fc95c2315a748c4b3d039191f0ac38a'

const authorizationURL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=http://localhost:3001/callback/`;

const getToken = async (code) => {
    const params = new URLSearchParams();
    params.set("grant_type", "authorization_code");
    params.set("code", code);
    params.set("client_id", CLIENT_ID);
    params.set("client_secret", CLIENT_SECRET);
    params.set("redirect_uri", "http://localhost:3001/callback/");


    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: params,
    });
    return await response.json();
}

const getPlaylists = async (token, queryParams) => {
    const response = await fetch(`https://api.spotify.com/v1/browse/featured-playlists?${queryParams}`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        })
    });
    return await response.json();
}

export { getPlaylists, getToken, authorizationURL };
