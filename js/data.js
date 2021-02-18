import { getRandomNumb } from './util.js';
import { getMockData } from './mock.js';

const MAX_PRICE = 1000000;
const MAX_ROOMS = 30;
const MAX_GUESTS = 100;
const MAX_PHOTOS = 10;
const COORD_DECIMALS_SIGNS = 5;

const tempData = getMockData();

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
    x: getRandomNumb(tempData.latitudeMin, tempData.latitudeMax, COORD_DECIMALS_SIGNS),
    y: getRandomNumb(tempData.longitudeMin, tempData.longitudeMax, COORD_DECIMALS_SIGNS),
  }
}

const getOffer = (AddressCoord) => {
  return {
    title: tempData.tempTitle,
    address: Object.values(AddressCoord).join(', '),
    price: getRandomNumb(0, MAX_PRICE),
    type: tempData.typesOfDwelling[getRandomNumb(0, tempData.typesOfDwelling.length-1)],
    rooms: getRandomNumb(0, MAX_ROOMS),
    guests: getRandomNumb(0, MAX_GUESTS),
    checkin: tempData.checkTimes[getRandomNumb(0, tempData.checkTimes.length-1)],
    checkout: tempData.checkTimes[getRandomNumb(0, tempData.checkTimes.length-1)],
    features: getFeatures(tempData.featuresList),
    description: tempData.tempDescription,
    photos: getPhotos(tempData.photosList, MAX_PHOTOS),
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

const getAdvertsDataArray = () => new Array(10).fill(null).map(() => getAdvert());

export { getAdvertsDataArray };
