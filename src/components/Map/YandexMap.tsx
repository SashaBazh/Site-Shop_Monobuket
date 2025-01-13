import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import './YandexMap.css'; // Подключаем внешний CSS файл для стилей

const YandexMap: React.FC = () => {
  const defaultState = {
    center: [53.942595, 27.598719], // Координаты магазина Monobyket
    zoom: 16,
  };

  return (
    <YMaps>
      <div className="yandex-map-container">
        <Map
          defaultState={defaultState}
          width="100%"
          height="100%"
          options={{
            suppressMapOpenBlock: true, // Убираем лишние элементы UI
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
      </div>
    </YMaps>
  );
};

export default YandexMap;
