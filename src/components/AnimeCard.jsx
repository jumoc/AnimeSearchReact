import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 130,
        width: 130
    },
    media: {
        height: 190,
        maxHeight: 190,
    },
    cardContent: {
        backgroundColor: '#d73770',
        padding: 5,
    },
    title: {
        fontSize: '0.8rem',
    }
});

/**
 * AnimeCard - creates an AnimeCard
 * props - variables passed when created by another component
 * @returns AnimeCard
 */
const AnimeCard = (props) => {

    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.image}
                    title={props.title}
                />
                <CardContent className={classes.cardContent}>
                    <Typography className={classes.title} gutterBottom variant="h5" component="h2" align='center' noWrap={true}>
                        {props.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default AnimeCard;