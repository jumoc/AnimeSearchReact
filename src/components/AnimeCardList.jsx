import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import AnimeCard from './AnimeCard'
import DisplayAnimeCard from './DisplayAnimeCard'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import FormControl from '@material-ui/core/FormControl';
const axios = require('axios').default;

const useStyles = makeStyles({
    root: {
        display: 'flex',
        listStyleType: 'none',
        justifyContent: 'center',
        alignItems: 'start',
        flexWrap: 'wrap'
    },

    diaplayImage: {
        display: 'flex',
        listStyleType: 'none',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        marginBottom: 50
    },

    li: {
        marginRight: 20,
        marginTop: 20,
    },

    searchBar: {
        alignSelf: 'center',
        minWidth: '50%',
        marginRight: 500,
        marginLeft: 500
    },

    input: {
        marginTop: 30,
        marginBottom: 0,
        backgroundColor: '',
        color: 'white',
        '&.Mui-focused fieldset': {
            borderColor: 'green',
        },
    },

    searchInputProps: {
        color: '#343A40',
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
    },

    searchButton: {
        alignSelf: 'center',
        position: 'relative',
        left: '45%',
        top: -53,
        color: '#FFC107'
    },

    selectedAnimeCard: {
        border: '2px solid #FFC107',
        borderRadius: 5,
    },

    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    ul: {
        paddingLeft: 0,
    },
    carrouselControllers: {
        alignSelf: 'center',
    },

    arrows: {
        color: '#FFC107'
    },

    rootCointainer: {
        width: '70%',
        padding: 20,
        margin: 'auto auto',
        borderRadius: 10,
        backgroundColor: '#343A40',

    },
    rootCointainerHandler: {
        padding: 20
    }
});

/**
 * calculateAverageScore - calculates de average Score of all the animes
 * @param animes - list of all anime objects
 * return - average of all the anime scores
 */
const calculateAverageScore = (animes) => {
    let scoreTotal = 0;
    animes.forEach((anime) => {
        scoreTotal += anime.score;
    });
    return (scoreTotal / animes.length);
}

/**
 * AnimeCardList - creates a AnimeCardList component
 * @returns AnimeCardList
 */
const AnimeCardList = () => {
    const classes = useStyles();
    const defaultActiveAnime = { image_url: 'https://i.imgur.com/w11gc60.png' };
    const defaultSearchAnime = { image_url: 'https://i.imgur.com/Ek5SgV3.png' };
    const [search, setSearch] = useState('');
    const [animeList, setAnimeList] = useState([]);
    const [activeAnime, setActiveAnime] = useState(defaultActiveAnime);
    const [leftLimit, setLeftLimit] = useState(0);
    const [rightLimit, setRightLimit] = useState(5);

    /**
     * handleSearch - handles the search variable for the getAnime  function
     * @param e - event passed from the form
     * return - error if failed request
     */
    const handleSearch = async (e = null) => {

        if (e) {
            e.preventDefault()
        }

        if (search && search.length > 3) {
            setLeftLimit(0);
            setRightLimit(5);
            try {
                await getAnime(search);
                setActiveAnime(defaultSearchAnime);
            } catch (error) {
                console.error(error);
            }
        }
    }

    /**
     * getAnime - requests the anime to the api
     * @param name - name that gets requested
     * return - error if failed request
     */
    const getAnime = async (name) => {
        try {
            const response = (await axios.get(`https://api.jikan.moe/v3/search/anime?q=${name}`)).data;
            setAnimeList(response.results);
            console.log(animeList);
        } catch (err) {
            console.error(err);
            return err;
        }
    }

    /**
     * selectActiveAnime - handler class for activeAnime state
     * @param anime - anime object
     */
    const selectActiveAnime = (anime) => {
        setActiveAnime(anime)
    }

    /**
     * moveRight - moves the list of AnimeCard right by 5
     */
    const moveRight = () => {
        if ((rightLimit + 5) <= animeList.length) {
            setLeftLimit(leftLimit + 5);
            setRightLimit(rightLimit + 5);
        }
    }

    /**
     * moveLeft - moves the list of AnimeCard left by 5
     */
    const moveLeft = () => {
        if ((leftLimit - 5) >= 0) {
            setLeftLimit(leftLimit - 5);
            setRightLimit(rightLimit - 5);
        }
    }

    return (
        <div>
            <div className={classes.searchContainer}>
                <form className={[classes.root, classes.searchBar].join(" ")} noValidate autoComplete='off' onSubmit={(e) => handleSearch(e)}>
                    <FormControl fullWidth>
                        <TextField className={classes.input} required inputProps={{ className: classes.searchInputProps }} label="Search Anime Titles" variant="outlined" onChange={(e) => setSearch(e.target.value)} fullWidth />
                        <IconButton aria-label="search" className={classes.searchButton} onClick={() => handleSearch()}>
                            <SearchIcon />
                        </IconButton>
                    </FormControl>
                </form>
            </div>
            <div className={classes.diaplayImage}>
                <DisplayAnimeCard activeAnime={activeAnime} onClick={() => window.open(activeAnime.url, "_blank")} />
            </div>
            <ul className={[classes.root, classes.ul].join(' ')}>
                <li className={classes.carrouselControllers}>
                    <IconButton aria-label="moveLeft" onClick={moveLeft}>
                        <ArrowBackIosIcon className={classes.arrows} />
                    </IconButton>
                </li>
                {animeList.slice(leftLimit, rightLimit).map((element) => <li id={element.title} className={classes.li} onClick={() => selectActiveAnime(element)}><AnimeCard key={element.title} title={element.title} image={element.image_url} /></li>)}
                <li className={classes.carrouselControllers}>
                    <IconButton aria-label="moveRight" onClick={moveRight}>
                        <ArrowForwardIosIcon className={classes.arrows} />
                    </IconButton>
                </li>
            </ul>
        </div>
    );
}

export default AnimeCardList;