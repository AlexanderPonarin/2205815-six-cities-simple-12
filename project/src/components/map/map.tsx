import React, {useRef, useEffect, useState} from 'react';
import leaflet, { LayerGroup, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map/use-map';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../consts';

import { Offer, Offers } from '../../types/offers';

type MapProps = {
    offers: Offers;
    city: Offer;
    activeOfferId: number;
    isPropertyScreenMap?: boolean;
}

function Map({city, offers, activeOfferId, isPropertyScreenMap}: MapProps): JSX.Element {
  const offer = city;
  const mapRef = useRef(null);
  const map = useMap({mapRef, offer});
  const [cityCenter, setCityCenter] = useState(offer.city.name);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      if (offer.city.name !== cityCenter) {
        map.flyTo(
          [
            offer.city.location.latitude,
            offer.city.location.longitude
          ],
          offer.city.location.zoom,
          {
            animate: true,
            duration: 3,
          }
        );

        setCityCenter(offer.city.name);
      }

      const markers = offers.map((of) =>
        new Marker({
          lat: of.location.latitude,
          lng: of.location.longitude,
        }, {
          icon: of.id === activeOfferId ? currentCustomIcon : defaultCustomIcon,
        })
      );

      const markerLayer = new LayerGroup(markers);
      markerLayer.addTo(map);

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [activeOfferId, cityCenter, currentCustomIcon, defaultCustomIcon, map, offer.city.location.latitude, offer.city.location.longitude, offer.city.location.zoom, offer.city.name, offers]);

  return (
    <section
      ref={mapRef}
      className={isPropertyScreenMap ?
        'property__map map'
        :
        'cities__map map'}
    >
    </section>
  );
}

export default Map;
