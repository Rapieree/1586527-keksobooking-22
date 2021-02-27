import { setStatusFilterForm } from './filter-form.js';
import { setAddressValue, initializingAdvertForm } from './advert-form.js';
import { getAdvertsDataArray } from './data.js';
import { getAdvertsCardsArray } from './cards.js';

const AdvertsDataArray = getAdvertsDataArray();
const AdvertsCardsArray = getAdvertsCardsArray();

const COORD_TOKYO = {
  x: 35.68070,
  y: 139.76855,
}

let adressCoord = {
  x: COORD_TOKYO.x,
  y: COORD_TOKYO.y,
}

/* global L:readonly */
const map = L.map('map-canvas')
  .on('load', () => {
    initializingAdvertForm();
    setAddressValue(adressCoord);
    setStatusFilterForm(true);
  })
  .setView({
    lat: COORD_TOKYO.x,
    lng: COORD_TOKYO.y,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

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
    lat: COORD_TOKYO.x,
    lng: COORD_TOKYO.y,
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

mainPinMarker.addTo(map);

const setExtraMarkers = (dataArray, cardsArray) => {
  for (let i = 0; i < dataArray.length; i++) {
    const extraPoint = L.marker(
      {
        lat: dataArray[i].location.x,
        lng: dataArray[i].location.y,
      },
      {
        icon: extraPinIcon,
      },
    );
    extraPoint.bindPopup(cardsArray.children[i]);
    extraPoint.addTo(map);
  }
}

setExtraMarkers(AdvertsDataArray, AdvertsCardsArray);
