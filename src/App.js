import React, { useState } from 'react';
import axios from 'axios';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import './App.css';
import WeatherBtn from './components/WeatherBtn';

const useStyles = makeStyles({
    root: { justifyContent: 'center', alignItems: 'center', height: '100vh' }
});

function App() {
    const classes = useStyles();
    const [weather, setWeather] = useState('');
    const openweathermapAPIKey = 'd1f89cad9083342bbd8c28d033e5388e';

    const fetchWeather = async (params) => {
        const url = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${openweathermapAPIKey}`;

        // Make a request for a user with a given ID
        axios
            .get(url)
            .then(function (response) {
                // handle success
                setWeather(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    };

    function geoLocate() {
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
                <Grid item xs={12}>
                    <WeatherBtn handleClick={fetchWeather}></WeatherBtn>
                </Grid>
                <Grid item xs={12}>
                    <Typography>{weather}</Typography>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
