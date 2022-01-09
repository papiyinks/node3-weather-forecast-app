const axios = require('axios');

const forecast = async (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/65ebd78f2a8ddeb114f49a3427710ee6/${latitude},${longitude}?units=si`;

    try {
        const { data } = await axios.get(url);

        const callbackMessage = `${data.daily.data[0].summary} It is currently ${data.currently.temperature} degrees out. There is a ${data.currently.precipProbability}% chance of rain.'`
        
        callback(undefined, callbackMessage)
    } catch (error) {
        (error.response != undefined) 
            ? callback("Unable to find location", undefined) 
            : callback("Unable to connect to weather service", undefined)
    }
}
 
module.exports = forecast