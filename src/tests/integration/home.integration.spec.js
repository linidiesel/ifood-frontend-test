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

    it("renders list with only 1 playlist after changing limit filter to 1", async () => {
        const { container } = renderHome(true);

        await waitFor(async () => expect(getPlaylists).toHaveBeenCalledTimes(2));

        const newPlaylistItem = { ...mockPlaylist }
        newPlaylistItem.playlists.items.splice(0, 1);
        getPlaylists.mockImplementation(() => Promise.resolve(newPlaylistItem));

        fireEvent.change(container.querySelector("#limit"), { target: { value: 1 } });
        fireEvent.blur(container.querySelector("#limit"));

        await waitFor(async () => expect(getPlaylists).toHaveBeenCalledWith("mock", 'limit=1'));

        expect(container.getElementsByClassName("MuiGridListTileBar-root")).toHaveLength(1);
    })
})
