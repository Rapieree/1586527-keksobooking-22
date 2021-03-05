import { setAddressValue, initializingAdvertForm } from './advert-form.js';
import { getAdvertCard } from './cards.js';
import { getAdvertsDataOfServer, errorServerHandler } from './server.js';
import { sortAdverts } from './util.js';

const MAX_ADVERTS = 10;

const CoordTokyo = {
  X: 35.68070,
  Y: 139.76855,
}

let adressCoord = {
  x: CoordTokyo.X,
  y: CoordTokyo.Y,
}

/* global L:readonly */
const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const extraPinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: CoordTokyo.X,
    lng: CoordTokyo.Y,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.on('move', (evt) => {
  adressCoord.x = evt.target.getLatLng().lat.toFixed(5);
  adressCoord.y = evt.target.getLatLng().lng.toFixed(5);
  setAddressValue(adressCoord);
});

const map = L.map('map-canvas');
const extraMarkersLayer = L.layerGroup();

// Установить метки объявлений
const setExtraMarkers = (dataArray) => {
  const sortedAdverts = dataArray
    .slice()
    .sort(sortAdverts)
    .filter((value) => value.filterFlag !== false) // избавление от неподходящих объявлений
    .slice(0, MAX_ADVERTS);

  extraMarkersLayer.clearLayers();
  for (let i = 0; i < sortedAdverts.length; i++) {
    const extraMarker = L.marker(
      {
        lat: sortedAdverts[i].location.lat,
        lng: sortedAdverts[i].location.lng,
      },
      {
        icon: extraPinIcon,
      },
    );
    const advertCard = getAdvertCard(sortedAdverts[i]);
    extraMarker.bindPopup(advertCard);
    extraMarker.addTo(extraMarkersLayer);
  }
  extraMarkersLayer.addTo(map);
};
export { setExtraMarkers };

// Инициализация карты
const initializationMap = () => {
  map
    .on('load', () => {
      initializingAdvertForm(); // Инициализируем форму объявлений
      setAddressValue(adressCoord); // Передаем ей значение главной метки
      mainPinMarker.addTo(map); // Добавляем главную метку на карту
    })
    .setView(
      {
        lat: CoordTokyo.X,
        lng: CoordTokyo.Y,
      }, 9);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  )
    .addTo(map);
}
export { initializationMap };

const setMainMarker = (coord) => {
  mainPinMarker.setLatLng({
    lat: coord.x,
    lng: coord.y,
  });
}

const resetMap = () => {
  setMainMarker(CoordTokyo);
  getAdvertsDataOfServer(setExtraMarkers, errorServerHandler);
}
export { resetMap };

