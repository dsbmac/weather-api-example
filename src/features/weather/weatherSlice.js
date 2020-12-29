import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

/* wrapper to handle generic promise */
const handle = (promise) => {
    return promise
        .then((data) => [data, undefined])
        .catch((error) => Promise.resolve([undefined, error]));
};

function getPosition(options) {
    return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
    );
}

const fetchWeather = async (location) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
    return axios.get(url);
};

export const locateWeather = createAsyncThunk('weather/fetchWeather', async () => {
    let [location, locationErr] = await handle(getPosition());
    if (locationErr) throw new Error('Could not locate user');

    let [weatherResp, weatherErr] = await handle(fetchWeather(location.coords));
    if (weatherErr) {
        throw new Error('Could not fetch weather');
    }
    return weatherResp.data;
});

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        isLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: {
        [locateWeather.fulfilled]: (state, action) => {
            return action.payload;
        },
        [locateWeather.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        }
    }
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.weather.value)`
export const selectWeather = (state) => state.weather;

export default weatherSlice.reducer;
