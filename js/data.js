import { getRandomNumb } from './util.js';

const TYPES_OF_DWELLING = ['palace', 'flat', 'house', 'bungalow'];
const CHECK_TIMES = ['12:00', '13:00', '14:00'];
const FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TEMP_TITLE = 'Милая, уютная халупа на окраине Питера';
const LATITUDE_MIN = 35.6;
const LATITUDE_MAX = 35.7;
const LONGITUDE_MIN = 139.7;
const LONGITUDE_MAX = 139.8;
const TEMP_DESCRIPTION = 'Мебель: кровать, стол и стулья, шкаф для одежды. ' +
  'Микроволновка, чайник, холодильник, плита. Утюг и гладильная доска.';
const PHOTOS_LIST = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const getAuthor = () =>  ({ avatar: 'img/avatars/user0' + getRandomNumb(1, 8) + '.png' });

const getFeatures = (featuresArr) => {
  let startIndex, endIndex;
  do {
    startIndex =  getRandomNumb(0, featuresArr.length-1);
    endIndex = getRandomNumb(1, featuresArr.length);
  } while(startIndex > endIndex);
  return featuresArr.slice(startIndex, endIndex);
}

const getPhotos = (photosArr, maxPhotos) => {
  let tempArr = new Array(getRandomNumb(1, maxPhotos)).fill(null);
  tempArr.forEach((value, index) => {
    tempArr[index] = photosArr[getRandomNumb(0, photosArr.length-1)];
  });
  return tempArr;
}

const getLocation = () => {
  return {
    x: getRandomNumb(LATITUDE_MIN, LATITUDE_MAX, 5),
    y: getRandomNumb(LONGITUDE_MIN, LONGITUDE_MAX, 5),
  }
}

const getOffer = (AddressCoord) => {
  return {
    title: TEMP_TITLE,
    adress: Object.values(AddressCoord).join(', '),
    price: getRandomNumb(0, 100000),
    type: TYPES_OF_DWELLING[getRandomNumb(0, TYPES_OF_DWELLING.length-1)],
    rooms: getRandomNumb(0, 10),
    guests: getRandomNumb(0, 30),
    checkin: CHECK_TIMES[getRandomNumb(0, CHECK_TIMES.length-1)],
    checkout: CHECK_TIMES[getRandomNumb(0, CHECK_TIMES.length-1)],
    features: getFeatures(FEATURES_LIST),
    description: TEMP_DESCRIPTION,
    photos: getPhotos(PHOTOS_LIST, 10),
  }
}

const getAdvert = () => {
  let locationAdress = getLocation();
  return {
    author: getAuthor(),
    offer: getOffer(locationAdress),
    location: locationAdress,
  }
}

const getAdvertsArray = () => new Array(10).fill(null).map(() => getAdvert());

export { getAdvertsArray };
