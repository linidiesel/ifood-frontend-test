import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

import { getPlaylists } from "../../services/spotify";

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';

const INTERVAL_TO_RELOAD_PLAYLIST_IN_MS = 30000;
// import Pagination from '@material-ui/lab/Pagination';

const List = () => {
    const { queryFilters, setError } = useContext(AuthContext);
    const [data, setData] = useState(null);
    const [token] = useState(localStorage.getItem("token"));

    const requestPlaylists = () => {
        const mountQueryParams = Object.keys(queryFilters).map((param) => `${param}=${queryFilters[param]}`);
        getPlaylists(token, mountQueryParams.join('&'))
            .then((data) => {
                setData(data)
            })
            .catch(error => setError(error))
    }

    useEffect(() => {
        requestPlaylists();
    }, [queryFilters])

    useEffect(() => {
        const interval = setInterval(() => { requestPlaylists() }, INTERVAL_TO_RELOAD_PLAYLIST_IN_MS)
        return () => clearInterval(interval);
    }, [])



    const useStyles = makeStyles((theme) => ({
        root: {
            marginTop: '30px'
        },
        titleSubHeader: {
            fontSize: '28px',
            color: '#000',
            textAlign: 'center',
        }
    }));

    const theme = useTheme();

    const screenExtraLarge = useMediaQuery(theme.breakpoints.only('xl'));
    const screenLarge = useMediaQuery(theme.breakpoints.only('lg'));
    const screenMedium = useMediaQuery(theme.breakpoints.only('md'));
    const screenSmall = useMediaQuery(theme.breakpoints.only('sm'));

    const getScreenWidth = () => {
        if (screenExtraLarge) {
        return 4;
        } else if (screenLarge || screenMedium) {
        return 3;
        } else if (screenSmall) {
        return 2;
        } else {
        return 1;
        }
    }

    const classes = useStyles();

    if(!data) return <>Buscando playlists...</>

    return (
        <div className={classes.root}>
            <GridList cellHeight={400} className={classes.gridList} cols={getScreenWidth()}>
                <GridListTile key="gridList-tile" cols={getScreenWidth()} style={{ height: 'auto' }}>
                    <ListSubheader component="div" className={classes.titleSubHeader}>{data.message}</ListSubheader>
                </GridListTile>
                {data.playlists.items.map((tile) => (
                    <GridListTile key={tile.id}>
                        <img src={tile.images[0].url} alt={tile.title} />
                        <GridListTileBar
                            title={tile.name}
                            subtitle={<span>by: {tile.owner.display_name}</span>}/>
                    </GridListTile>
                ))}
            </GridList>
        </div>)
}

export default List;
