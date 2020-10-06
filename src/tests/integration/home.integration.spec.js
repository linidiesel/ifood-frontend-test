import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Home from '../../pages/home';
import { AuthContext } from '../../contexts/AuthContext';
import { authorizationURL } from '../../services/spotify';
import { getFilters } from '../../services/filter';

import mockFilter from '../mocks/filterMock';

jest.mock('../../services/filter', () => ({
    getFilters: jest.fn()
}));

describe('home unauthorized', () => {

    it("contains the hello text and the spotify link", () => {
        render(<AuthContext.Provider value={{ isAuthorized: false }}>
                    <BrowserRouter>
                        <Home />
                    </BrowserRouter>
                </AuthContext.Provider>)

        expect(screen.getByText(/Olá/i)).toBeInTheDocument();
        expect(screen.getByRole('link', { href: authorizationURL })).toBeInTheDocument();
    })
})

describe('home authorized', () => {

    it("renders with data in filters and playlists", async () => {
        getFilters.mockImplementation(() => Promise.resolve(mockFilter));

        render(<AuthContext.Provider value={{ isAuthorized: true, queryFilters: {} }}>
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        </AuthContext.Provider>)

        expect(screen.getByText(/Buscando filtros/i)).toBeInTheDocument();
        expect(screen.getByText(/Buscando playlists/i)).toBeInTheDocument();

        await waitFor(() => expect(getFilters).toHaveBeenCalled())
    })
})
