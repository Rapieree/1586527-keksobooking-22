import { getRandomNumb } from './util.js';
import { getMockData } from './mock.js';

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
    x: getRandomNumb(tempData.latitudeMin, tempData.latitudeMax, 5),
    y: getRandomNumb(tempData.longitudeMin, tempData.longitudeMax, 5),
  }
}

const getOffer = (AddressCoord) => {
  return {
    title: tempData.tempTitle,
    address: Object.values(AddressCoord).join(', '),
    price: getRandomNumb(0, 100000),
    type: tempData.typesOfDwelling[getRandomNumb(0, tempData.typesOfDwelling.length-1)],
    rooms: getRandomNumb(0, 10),
    guests: getRandomNumb(0, 30),
    checkin: tempData.checkTimes[getRandomNumb(0, tempData.checkTimes.length-1)],
    checkout: tempData.checkTimes[getRandomNumb(0, tempData.checkTimes.length-1)],
    features: getFeatures(tempData.featuresList),
    description: tempData.tempDescription,
    photos: getPhotos(tempData.photosList, 10),
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
