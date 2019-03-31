const env = process.env.NODE_ENV || 'development';

module.exports = {
  development: {
    apiUrl: 'http://localhost:3000',
    pixabayApiKey: '10396484-6adddc15ced3b7f75f1d985c9',
    gMapsApiKey: 'AIzaSyBc3mZIx9wvjlXd2iG5JiE5qgpIkhhL47U',
    issPositionUrl: 'http://api.open-notify.org/iss-now.json',
    geobytesUrl: 'http://getnearbycities.geobytes.com/GetNearbyCities',
  },
  production: {
    apiUrl: 'https://olapic-api.atasanchez.com',
    pixabayApiKey: '10396484-6adddc15ced3b7f75f1d985c9',
    gMapsApiKey: 'AIzaSyBc3mZIx9wvjlXd2iG5JiE5qgpIkhhL47U',
    issPositionUrl: 'http://api.open-notify.org/iss-now.json',
    geobytesUrl: 'http://getnearbycities.geobytes.com/GetNearbyCities',
  },
}[env];
