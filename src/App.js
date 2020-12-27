import { Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import './App.css';
import WeatherBtn from './components/WeatherBtn';

const useStyles = makeStyles({
    root: { justifyContent: 'center', alignItems: 'center', height: '100vh' }
});

function App() {
    const classes = useStyles();
    return (
        <div className="App">
            <Grid container className={classes.root}>
                <Grid item>
                    <WeatherBtn></WeatherBtn>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
