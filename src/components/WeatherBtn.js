import React from 'react';
import { Button } from '@material-ui/core';

const WeatherBtn = ({ handleClick }) => {
    return (
        <Button color="primary" variant="contained" onClick={handleClick}>
            Get Weather
        </Button>
    );
};

export default WeatherBtn;
