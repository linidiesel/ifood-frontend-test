import React, { useState } from 'react';
import { render, screen, waitFor, debug, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Home from '../../pages/home';
import { AuthContext, AuthContextProvider } from '../../contexts/AuthContext';
import { authorizationURL, getPlaylists } from '../../services/spotify';
import { getFilters } from '../../services/filter';

import mockFilter from '../mocks/filterMock';
import mockPlaylist from '../mocks/playlistMock';


jest.mock('../../services/filter', () => ({
    getFilters: jest.fn()
}));

jest.mock('../../services/spotify', () => ({
    getPlaylists: jest.fn(),
    authorizationURL: jest.requireActual('../../services/spotify')
}));

const renderHome = (isAuthenticated = false) => {
    if(isAuthenticated) window.localStorage.setItem("token", "mock");

    const {container} = render(
        <AuthContextProvider>
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        </AuthContextProvider>)
    return { container };
}

describe('Home: unauthenticated', () => {

    it("contains the hello text and the spotify link", () => {
        renderHome();
        expect(screen.getByText(/Olá/i)).toBeInTheDocument();
        expect(screen.getByRole('link', { href: authorizationURL })).toBeInTheDocument();
    })
})

describe('Home: authenticated', () => {

    beforeEach(() => {
        getFilters.mockImplementation(() => Promise.resolve(mockFilter));
        getPlaylists.mockImplementation(() => Promise.resolve(mockPlaylist));
    })

    afterEach(() => jest.resetAllMocks())

    it("renders with data in filters and playlists", async () => {
        const { container } = renderHome(true);

        expect(screen.getByText(/Buscando filtros/i)).toBeInTheDocument();
        expect(screen.getByText(/Buscando playlists/i)).toBeInTheDocument();

        await waitFor(() => expect(getFilters).toHaveBeenCalled())
        await waitFor(() => expect(getPlaylists).toHaveBeenCalled())

        expect(screen.getByText(/Chuva para Dormir/i)).toBeInTheDocument();
        expect(screen.getByText(/Piano para Dormir/i)).toBeInTheDocument();
        expect(container.getElementsByClassName("MuiGridListTileBar-root")).toHaveLength(2);
    })

    const scenarios = [
        [
            "timestamp filter is changed",
            "filter-timestamp",
            "10/10/2020 10:10",
            undefined,
            "timestamp=2019-09-10T13:20:00.000Z",
            2
        ],
        [
            "locale filter is changed",
            "filter-locale",
            "en_AU",
            undefined,
            "locale=en_AU",
            2
        ],
        [
            "country filter is changed",
            "filter-country",
            "AU",
            undefined,
            "country=AU",
            2
        ],
        [
            "limit filter is changed",
            "filter-limit",
            "1",
            () => { const mockItemsFiltered = [ mockPlaylist.playlists.items[0] ]
                    const mockPlaylistFiltered = { mockFilter, playlists: { items: mockItemsFiltered } }
                    getPlaylists.mockImplementation(() => Promise.resolve(mockPlaylistFiltered)); 
            },
            "limit=1",
            1
        ]
    ]

    it.each(scenarios)(`renders list with new data when %s`,
        async (_, elementID, elementValue, fnCallToChangeMock, expectedParamOnPlaylistCall, expectedItemsInList) => {
            const { container } = renderHome(true);

            await waitFor(async () => expect(getPlaylists).toHaveBeenCalled());

            if(fnCallToChangeMock) fnCallToChangeMock()

            console.log("elemento", elementID)
            fireEvent.change(container.querySelector(`#${elementID}`), { target: { value: elementValue } });
            fireEvent.blur(container.querySelector(`#${elementID}`));

            await waitFor(async () => expect(getPlaylists).toHaveBeenCalledWith("mock", expectedParamOnPlaylistCall));

            expect(container.getElementsByClassName("MuiGridListTileBar-root")).toHaveLength(expectedItemsInList);
        })
})
