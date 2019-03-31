import React, { Component } from 'react';
import styles from './styles.scss';
import env from '../../../../../config/env';

class MapContainerComponent extends Component {
  componentDidMount() {
    this.createScript();
  }

  componentDidUpdate(prevProps) {
    const { options } = this.props;

    if (options !== prevProps.options) {
      this.createScript();
    }
  }

  onScriptLoad() {
    const { id, options, onMapLoad } = this.props;

    const map = new window.google.maps.Map(document.getElementById(id), options);
    onMapLoad(map);
  }

  createScript() {
    if (!window.google) {
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=${env.gMapsApiKey}`;
      const x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      s.addEventListener('load', () => {
        this.onScriptLoad();
      });
    } else {
      this.onScriptLoad();
    }
  }

  render() {
    const { id } = this.props;

    return (
      <div
        id={id}
        className={styles.map}
      />
    );
  }
}

export default MapContainerComponent;
