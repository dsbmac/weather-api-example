import React, { useState } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import './App.css';
import WeatherBtn from './components/WeatherBtn';

const useStyles = makeStyles({
    root: { justifyContent: 'center', alignItems: 'center', height: '100vh' }
});

function App() {
    const classes = useStyles();
    const [weather, setWeather] = useState('');
    function geoFindMe() {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos) {
            var crd = pos.coords;
            const newMsg = `Your current position is:\n  Latitude : ${crd.latitude} Longitude: ${crd.longitude} (+/- ~${crd.accuracy}m).`;
            setWeather(newMsg);
        }

        function error(err) {
            const newMsg = `ERROR(${err.code}): ${err.message}`;
            setWeather(newMsg);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    return (
        <div className="App">
            <Grid container className={classes.root}>
                <Grid item>
                    <WeatherBtn handleClick={geoFindMe}></WeatherBtn>
                </Grid>
                <Grid>
                    <Typography>{weather}</Typography>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
