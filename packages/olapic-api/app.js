var express = require('express');
var axios = require('axios');
var env = require('../../config/env');

var app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/*
Request the current position of the ISS and the list of cities near
it in 600km2. Unify and format the response for better use from the
frontend application.
*/
app.get('/', (req, res) => {
  axios.get(env.issPositionUrl)
    .then((resIIS) => {
      if (resIIS.data && resIIS.data.iss_position) {
        axios.get(env.geobytesUrl, {
          params: {
            limit: 50,
            Radius: '600',
            latitude: resIIS.data.iss_position.latitude,
            longitude: resIIS.data.iss_position.longitude,
          },
        }).then((resNEAR) => {
          const nearbyCities = resNEAR.data
            ? resNEAR.data.map(x => ({
              city: x[1],
              country: x[3],
              latitude: x[8],
              longitude: x[10],
            }))
            : [];
          res.send({
            ...resIIS.data.iss_position,
            nearbyCities,
          });
        }).catch(errorNEAR => res.send(`error${errorNEAR}`));
      } else {
        res.send({
          ...resIIS.data,
          nearbyCities: [],
        });
      }
    }).catch(errorIIS => res.send(`error${errorIIS}`));
});

app.listen(3000, () => {
  console.log('> Ready in: http://localhost:3000/');
});
