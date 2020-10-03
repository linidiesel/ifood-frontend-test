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

    return await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        mode: 'cors',
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: params,
    }).then(response => {
        if(response.ok) return response.json()

        throw new Error(response.status);
    });
}

const getRefreshToken = async (refreshToken) => {
    const params = new URLSearchParams();
    params.set("grant_type", "refresh_token");
    params.set("refresh_token", refreshToken);
    params.set("client_id", CLIENT_ID);
    params.set("client_secret", CLIENT_SECRET);
    params.set("redirect_uri", "http://localhost:3001/callback/");

    return await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        mode: 'cors',
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: params,
    }).then(response => {
        if(response.ok) return response.json()

        throw new Error(response.status);
    });
}

const getPlaylists = async (token, queryParams) => {
    return await fetch(`https://api.spotify.com/v1/browse/featured-playlists?${queryParams}`, {
        method: 'GET',
        mode: 'cors',
        headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        })
    }).then(response => {
        if(response.ok) return response.json()

        throw new Error(response.status);
    });
}

export { getPlaylists, getToken, getRefreshToken, authorizationURL };
