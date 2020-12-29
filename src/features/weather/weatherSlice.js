import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

function getPosition(options) {
    return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
    );
}

async function getWeather() {
    let [location, locationErr] = await handle(getPosition());
    if (locationErr) throw new Error('Could not locate user');

    let [weatherResp, weatherErr] = await handle(fetchWeatherV2(location.coords));
    if (weatherErr) {
        throw new Error('Could not fetch weather');
    }
    return weatherResp;
}

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async () => {
    const response = await getWeather();
    return response.data;
});

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        isLoading: false,
        data: {}
    },
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        }
    },
    extraReducers: {
        [fetchWeather.fulfilled]: (state, action) => {
            return action.payload;
        },
        [fetchWeather.rejected]: (state, action) => {
            return action.payload;
        }
    }
});

export const { increment, decrement, incrementByAmount } = weatherSlice.actions;

const handle = (promise) => {
    return promise
        .then((data) => [data, undefined])
        .catch((error) => Promise.resolve([undefined, error]));
};

const fetchWeatherV2 = async (location) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;

    // Make a request for a user with a given ID
    return axios.get(url);
};


// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const fetchWeatherAsync = () => async (dispatch) => {
    // Make a request for a user with a location

    // const url = `http://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
    // return axios.get(url);

    try {
        const weather = await getWeather();
        console.log(JSON.stringify(weather.main));
    } catch (error) {
        console.log(error.message);
    }
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.weather.value)`
export const selectWeather = (state) => state.weather;

export default weatherSlice.reducer;
