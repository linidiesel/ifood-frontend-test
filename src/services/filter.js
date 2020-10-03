const getFilters = async () => {
    const response = await fetch('http://www.mocky.io/v2/5a25fade2e0000213aa90776', {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    return await response.json()
}

export { getFilters }
