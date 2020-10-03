import React from 'react';
import { authorizationURL } from '../../services/spotify'
import { SpotifySVG } from './svg'

import './button.css';

const StartsWithSpotifyLink = () =>
    <a className="btn-starts-spotify" href={authorizationURL}>
        <div>
            <span>Iniciar com spotify</span>
            <SpotifySVG />
        </div>
    </a>

export { StartsWithSpotifyLink }
