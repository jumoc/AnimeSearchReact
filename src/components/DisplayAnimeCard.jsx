import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { green, red, orange } from '@material-ui/core/colors';

const useStyles = makeStyles({
    root: {
        maxWidth: 230,
        width: 230,
        backgroundColor: '#d73770'
    },
    media: {
        height: 300,
        maxHeight: 300,
    },
    cardContent: {
        backgroundColor: '#d73770',
        padding: 5,
    },
    title: {
        fontSize: '1.3rem',
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: '1.0rem',
        fontWeight: 'italic',
    },
    description: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

});

/**
 * DisplayAnimeCard - creates a DisplayAnimeCard
 * props - variables passed when created by another component
 * @returns DisplayAnimeCard
 */
const DisplayAnimeCard = (props) => {

    const classes = useStyles();

    /**
     * calculateRates - returns a typography component and an icon depending on the score of the anime
     * @returns Typography and Emoticon components
     */
    const calculateRates = () => {
        console.log('name', props.activeAnime.title, 'score', props.activeAnime.score);
        if (props.activeAnime.score >= 8) {
            return (<> <Typography className={classes.subTitle} gutterBottom variant="h5" component="h2" align='center'>
                Great, this is one
                of the best animes
            </Typography>
                <InsertEmoticonIcon style={{ color: green[500] }} fontSize="large" />
            </>);
        } else if (props.activeAnime.score >= 5) {
            return (<> <Typography className={classes.subTitle} gutterBottom variant="h5" component="h2" align='center'>
                You may have
                fun
            </Typography>
                <SentimentSatisfiedIcon style={{ color: orange[500] }} fontSize="large" />
            </>);
        } else if (props.activeAnime.score >= 1) {
            return (<>
                <Typography className={classes.subTitle} gutterBottom variant="h5" component="h2" align='center'>
                    I do not
                    recommend it
                </Typography>
                <SentimentVeryDissatisfiedIcon style={{ color: red[500] }} fontSize="large" />
            </>);
        } else if (props.activeAnime.score === 0) {
            return (<> <Typography className={classes.subTitle} gutterBottom variant="h5" component="h2" align='center'>
                It looks like this anime has no score, please rate it!
            </Typography>
                <SentimentSatisfiedIcon style={{ color: orange[500] }} fontSize="large" />
            </>);
        }
    }

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.activeAnime.image_url}
                    title={props.activeAnime.title}
                />
                <CardContent className={classes.cardContent}>
                    <Typography className={classes.title} gutterBottom variant="h5" component="h2" align='center'>
                        <a id="myLink" rel="noreferrer" href={props.activeAnime.url} target="_blank">{props.activeAnime.title}</a>
                    </Typography>
                    <div className={classes.description}>
                        {calculateRates()}
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default DisplayAnimeCard;