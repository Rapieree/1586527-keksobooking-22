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

// Проверка вероятности
let minimum = 0;
let maximum = 10;
let decimal = 0;
let arrCount = new Map();

for(let i = 0; i < 100000; i++) {
  let temp = getRandomNumb(minimum, maximum, decimal);
  arrCount.has(temp) ? arrCount.set(temp, arrCount.get(temp) + 1) : arrCount.set(temp, 1);
}

arrCount.forEach((value, key) => console.log('Число = ' + key +', Совпадений = ' + value));
