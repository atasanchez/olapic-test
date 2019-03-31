import React, { Component } from 'react';

// Components
import MapContainer from '@components/MapContainer';
import Item from '@components/Item';
import LoadingRight from '@components/LoadingRight';
import LoadingLeft from '@components/LoadingLeft';

// Services
import {
  getCurrentISSPositionAndNearbyCities,
  getMediaFromNearbyCities,
} from '@services/utils';

// Styles
import styles from './styles.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nearbyCities: [],
      citiesImages: [],
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  /*
  Obtain the position of the ISS and the nearby cities
  from the API gateway, format said response and request
  a list of photos and videos to the pixabay API.
  */
  getData() {
    getCurrentISSPositionAndNearbyCities()
      .then((resIssPosition) => {
        this.setState(prevState => ({
          ...prevState,
          issPosition: {
            lat: Number(resIssPosition.data.latitude),
            lng: Number(resIssPosition.data.longitude),
          },
          nearbyCities: (resIssPosition.data.nearbyCities[0]
            && resIssPosition.data.nearbyCities[0].city)
            ? resIssPosition.data.nearbyCities
            : [],
        }));

        const places = this.state.nearbyCities.map(x => ({
          city: x.city.replace(' ', '+'),
          country: x.country,
        }));

        if (places.length) {
          getMediaFromNearbyCities(places)
            .then((resMedia) => {
              this.setState(prevState => ({
                ...prevState,
                citiesImages: resMedia,
              }));
            })
            .catch((e) => {
              throw (e);
            });
        }
      }).catch((e) => {
        throw (e);
      });
  }

  /*
  Initialize and configure the side map of the application.
  */
  renderMap() {
    const { issPosition, nearbyCities } = this.state;

    return (
      <MapContainer
        id="mainMap"
        options={{
          center: {
            lat: issPosition.lat,
            lng: issPosition.lng,
          },
          mapTypeControl: false,
          scrollwheel: false,
          streetViewControl: false,
          zoomControl: false,
          zoom: 5,
        }}
        onMapLoad={(map) => {
          map.panTo({
            lat: issPosition.lat,
            lng: issPosition.lng,
          });

          new window.google.maps.Circle({
            strokeColor: '#27ae60',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#2ecc71',
            fillOpacity: 0.08,
            map,
            center: {
              lat: issPosition.lat,
              lng: issPosition.lng,
            },
            radius: 600000,
          });

          new window.google.maps.Marker({
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            position: {
              lat: issPosition.lat,
              lng: issPosition.lng,
            },
            map,
          });

          nearbyCities.map(place => new window.google.maps.Marker({
            position: {
              lat: Number(place.latitude),
              lng: Number(place.longitude),
            },
            animation: window.google.maps.Animation.DROP,
            map,
            title: `${place.city} - ${place.country}`,
          }));
        }
        }
      />
    );
  }

  render() {
    const { issPosition, citiesImages } = this.state;

    return (
      <div className={styles.app}>
        <div className={styles.left_panel}>
          {
            issPosition
              ? <>
                {this.renderMap()}
                <button type="button" onClick={this.getData} className={styles.btn}>Update position</button>
              </>
              : <LoadingLeft />
          }
        </div>
        <div className={styles.right_panel}>
          {
            citiesImages.length > 0
              ? citiesImages.map((x, index) => <Item key={index} data={x} />)
              : (
                <div className={styles.no_pictures}>
                  {
                    issPosition
                      ? <>
                        <h4 className={styles.text}>Oh no!</h4>
                        <span>No photos or videos to show...</span>
                      </>
                      : <LoadingRight />
                  }
                </div>
              )}
        </div>
      </div>
    );
  }
}

export default App;
