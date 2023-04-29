import { MutableRefObject, useEffect, useRef, useState } from 'react';
import leaflet from 'leaflet';
import { Map } from 'leaflet';
import { Offer } from '../../types/offers';

type useMapProps = {
  mapRef: MutableRefObject<HTMLElement | null>;
  offer: Offer;
}

function useMap({mapRef, offer}: useMapProps): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);


  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {

      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: offer.city.location.latitude,
          lng: offer.city.location.longitude,
        },
        zoom: 13,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;


    }
  }, [mapRef, offer, map]);

  return map;
}

export default useMap;
