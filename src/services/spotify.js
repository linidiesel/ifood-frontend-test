const appClientID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
const appClientSecret = process.env.REACT_APP_SPOTIFY_SECRET_ID
const spotifyAuthAPIURL = process.env.REACT_APP_SPOTIFY_AUTHENTICATION_API_URL;
const spotifyAPIURL = process.env.REACT_APP_SPOTIFY_API_URL;
const spotifyRedirectURI = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

const authorizationURL = `${spotifyAuthAPIURL}authorize?client_id=${appClientID}&response_type=code&redirect_uri=${spotifyRedirectURI}`;

const getToken = async (code) => {
    const params = new URLSearchParams();
    params.set("grant_type", "authorization_code");
    params.set("code", code);
    params.set("client_id", appClientID);
    params.set("client_secret", appClientSecret);
    params.set("redirect_uri", spotifyRedirectURI);

    return await fetch(`${spotifyAuthAPIURL}api/token`, {
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
    params.set("client_id", appClientID);
    params.set("client_secret", appClientSecret);
    params.set("redirect_uri", spotifyRedirectURI);

    return await fetch(`${spotifyAuthAPIURL}api/token`, {
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
    return await fetch(`${spotifyAPIURL}browse/featured-playlists?${queryParams}`, {
        method: 'GET',
        mode: 'cors',
        headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        })
    }).then(response => {
        if(response.ok) return response.json()

        throw new Error({ status: response.status });
    });
}

export { getPlaylists, getToken, getRefreshToken, authorizationURL };
