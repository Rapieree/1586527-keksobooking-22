/* eslint-disable no-console */
'use strict';

// decimalSign - Символов после запятой, 0 для целых чисел
const getRandomNumb = (min, max, decimalSign = 0) => {
  if((min < 0 || max < 0 || decimalSign < 0 || !Number.isInteger(decimalSign)) || Math.abs(min - max) === 0) {
    return ;
  } // Проверка на положительные значения и диапазон больше 0
  if(decimalSign === 0 && !(Number.isInteger(min) && Number.isInteger(max))) {
    return ;
  } // Проверка на целые числа, при 0 знаков после запятой
  let realMin = Math.min(min, max);
  let realMax = Math.max(min, max);
  let ratio = Math.pow(10, decimalSign); // Перевод в нужную размерность
  let random = realMin - 0.5/ratio + Math.random() * (realMax - realMin + 1/ratio);
  // модифицированный вариант с сайта https://learn.javascript.ru/task/random-int-min-max

  random = parseFloat(random.toFixed(decimalSign));
  return Number.isInteger(random) ? Math.round(random) : random;
}

// // Проверка вероятности
// let minimum = 0;
// let maximum = 10;
// let decimal = 0;
// let arrCount = new Map();
// for(let i = 0; i < 100000; i++) {
//   let temp = getRandomNumb(minimum, maximum, decimal);
//   arrCount.has(temp) ? arrCount.set(temp, arrCount.get(temp) + 1) : arrCount.set(temp, 1);
// }
// arrCount.forEach((value, key) => console.log('Число = ' + key +', Совпадений = ' + value));

const TYPE_DWELLING = ['palace', 'flat', 'house', 'bungalow'];
const CHECK_TIME = ['12:00', '13:00', '14:00'];
const FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TEMP_TITLE = 'Милая, уютная халупа на окраине Питера';
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
    x: getRandomNumb(35.6, 35.7, 5),
    y: getRandomNumb(139.7, 139.8, 5),
  }
}

const getOffer = (AdressCoord) => {
  return {
    title: TEMP_TITLE,
    adress: Object.values(AdressCoord).join(', '),
    price: getRandomNumb(0, 100000),
    type: TYPE_DWELLING[getRandomNumb(0, TYPE_DWELLING.length-1)],
    rooms: getRandomNumb(0, 10),
    guests: getRandomNumb(0, 30),
    checkin: CHECK_TIME[getRandomNumb(0, CHECK_TIME.length-1)],
    checkout: CHECK_TIME[getRandomNumb(0, CHECK_TIME.length-1)],
    features: getFeatures(FEATURES_LIST),
    description: TEMP_DESCRIPTION,
    photos: getPhotos(PHOTOS_LIST, 10),
  }
}

const getAdvert = (locationAdress) => {
  return {
    author: getAuthor(),
    offer: getOffer(locationAdress),
    location: locationAdress,
  }
}

const advertsArray = new Array(10).fill(null).map(() => getAdvert(getLocation()));

console.log(advertsArray);
