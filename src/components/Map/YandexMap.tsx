import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { YandexMapContainer } from './YandexMap.styles';

const YandexMap: React.FC = () => {
  const defaultState = {
    center: [53.942595, 27.598719],
    zoom: 16,
  };

  return (
    <YMaps>
      <YandexMapContainer>
        <Map
          defaultState={defaultState}
          width="100%"
          height="100%"
          options={{
            suppressMapOpenBlock: true,
          }}
        >
          <Placemark
            geometry={[53.942595, 27.598719]}
            properties={{
              hintContent: 'Monobyket',
              balloonContent: 'Г. Минск, Ул. Леонида Беды 46, ТЦ "4 сезона"',
            }}
          />
        </Map>
      </YandexMapContainer>
    </YMaps>
  );
};

export default YandexMap;
