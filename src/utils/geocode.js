const axios = require('axios');

const geocode = async (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicGFwaXlpbmtzIiwiYSI6ImNqeW9hd251cDB3Z28zbHBldnB3MXAwYjEifQ.swLCWU025KuLISMVAKbNGA&limit=1`;

    try {
        const { data } = await axios.get(url);
        if (data.features.length === 0) {
            return callback("Unable to find location. Try another search", undefined)
        }
        
        callback(undefined, {
            latitude: data.features[0].center[1],
            longitude: data.features[0].center[0],
            location: data.features[0].place_name
        })
    } catch (error) {
        callback("Unable to connect to location services", undefined)
    }
}

module.exports = geocode