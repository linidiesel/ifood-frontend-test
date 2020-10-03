const getFilters = async () => {
    return await fetch('http://www.mocky.io/v2/5a25fade2e0000213aa90776', {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(response => {
        if(response.ok) return response.json()

        throw new Error(response.status);
    });
}

export { getFilters }
