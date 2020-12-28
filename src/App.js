import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import './App.css';
import WeatherBtn from './components/WeatherBtn';

const useStyles = makeStyles({
    root: { justifyContent: 'center', alignItems: 'center', height: '100vh' },
    content: { justifyContent: 'center', alignItems: 'center' },
    message: { wordWrap: 'break-word' },
    item: { padding: '10px' }
});

function App() {
    const classes = useStyles();
    const [timestamp, setTimestamp] = useState(null);
    const [weather, setWeather] = useState({});
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [geoLocation, setGeoLocation] = useState(null);

    const setError = (isErrorParam, errorMsg) => {
        setIsError(isErrorParam);
        setErrorMsg(errorMsg);
    };

    const handleClick = async () => {
        try {
            setError(false, '');
            geoLocate();
        } catch (error) {
            setError(true, error);
        }
    };

    const fetchWeather = async (params) => {
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.latitude}&lon=${geoLocation.longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;

        // Make a request for a user with a given ID
        axios
            .get(url)
            .then(function (response) {
                // handle success
                setWeather(response.data);
            })
            .catch(function (error) {
                // handle error
                setError(true, error);
            });
    };
    // refreshes data upon button click
    useEffect(() => {
        if (timestamp != null && geoLocation != null) {
            fetchWeather();
        }
    }, [geoLocation, timestamp]);

    async function geoLocate() {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos) {
            var crd = pos.coords;
            setGeoLocation(crd);
            setTimestamp(Date.now());
        }

        function error(err) {
            const newMsg = `ERROR(${err.code}): ${err.message}`;
            setError(true, newMsg);
        }

        return navigator.geolocation.getCurrentPosition(success, error, options);
    }

    return (
        <div className="App">
            <Grid container className={classes.root}>
                <Grid container className={classes.content}>
                    <Grid item xs={12} className={classes.item}>
                        <WeatherBtn handleClick={handleClick}></WeatherBtn>
                    </Grid>
                    <Grid item xs={12} className={classes.item}>
                        <Typography className={classes.message}>
                            {isError ? errorMsg : JSON.stringify(weather.main)}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
