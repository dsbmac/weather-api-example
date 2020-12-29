import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { selectWeather, locateWeather } from './weatherSlice';
import WeatherBtn from './WeatherBtn';

const useStyles = makeStyles({
    root: { justifyContent: 'center', alignItems: 'center', height: '100vh' },
    content: { justifyContent: 'center', alignItems: 'center' },
    message: { wordWrap: 'break-word' },
    item: { padding: '10px' }
});

export function Weather() {
    const dispatch = useDispatch();
    const weather = useSelector(selectWeather);
    const error = useSelector((state) => state.weather.error);
    const classes = useStyles();

    const handleClick = () => {
        dispatch(locateWeather());
    };

    return (
        <Grid container className={classes.root}>
            <Grid container className={classes.content}>
                <Grid item xs={12} className={classes.item}>
                    <WeatherBtn handleClick={handleClick}></WeatherBtn>
                </Grid>
                <Grid item xs={12} className={classes.item}>
                    <Typography className={classes.message}>
                        {error ? error : JSON.stringify(weather.main)}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}
