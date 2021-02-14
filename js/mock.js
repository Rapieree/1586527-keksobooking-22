const getMockData = () => {
  return {
    typesOfDwelling: ['palace', 'flat', 'house', 'bungalow'],
    checkTimes: ['12:00', '13:00', '14:00'],
    featuresList: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    tempTitle: 'Милая, уютная халупа на окраине Питера',
    latitudeMin: 35.65,
    latitudeMax: 35.7,
    longitudeMin: 139.7,
    longitudeMax: 139.8,
    tempDescription: 'Мебель: кровать, стол и стулья, шкаф для одежды. ' +
      'Микроволновка, чайник, холодильник, плита. Утюг и гладильная доска.',
    photosList: [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
    ],
  };
};

export { getMockData };
