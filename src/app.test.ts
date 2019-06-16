import NutriScore from './app';
import { FOOD_TYPE } from './interfaces/foodTypes';
import scoreTableJSON from './scoreTable.json';
import { scoreTableInterface } from './interfaces/scoreTableInterface';
import { NUTRIENT_TYPES } from './interfaces/nutrientTypes';
let scoreTable: scoreTableInterface = <scoreTableInterface>scoreTableJSON;

test('Test nutrient table score algo', () => {
  const scoreTable: Array<[number, number, number]> = [
    [-Infinity, 0, 0],
    [1, 30, 1],
    [30, 60, 2],
    [60, 90, 3],
    [90, 120, 4],
    [120, 150, 5],
    [150, 180, 6],
    [180, 210, 7],
    [210, 240, 8],
    [240, 270, 9],
    [270, +Infinity, 10]
  ];
  const score = new NutriScore();
  expect(score.calculateNutrientScore(scoreTable, -1000)).toBe(0);
  expect(score.calculateNutrientScore(scoreTable, 0)).toBe(0);
  expect(score.calculateNutrientScore(scoreTable, 1)).toBe(0);
  expect(score.calculateNutrientScore(scoreTable, 30)).toBe(1);
  expect(score.calculateNutrientScore(scoreTable, 31)).toBe(2);
  expect(score.calculateNutrientScore(scoreTable, 10000)).toBe(10);
})

test('Test inRange method', () => {
  const score = new NutriScore();
  expect(score['inRange'](5, 1, 10)).toBeTruthy();
  expect(score['inRange'](11, 1, 10)).toBeFalsy()
  expect(score['inRange'](0, 1, 10)).toBeFalsy()
  expect(score['inRange'](-5, -15, -3)).toBeTruthy()
  expect(score['inRange'](0, -1, 0)).toBeTruthy()
  expect(score['inRange'](-1, -1, 0)).toBeFalsy()
  expect(score['inRange'](-0.99999, -1, 0)).toBeTruthy()
})

test('Test calculation with special case', () => {
  const score = new NutriScore();
  const result = score.calculate({
    "proteins": 5,
    "energy": 2000,
    "fibers": 3,
    "fruit_percentage": 42,
    "saturated_fats": 3,
    "sodium": 500,
    "sugar": 22
  }, FOOD_TYPE.SOLID);
  expect(result).toBe(12);
})

test('Test individual nutrients', () => {
  const score = new NutriScore();
  expect(score.calculateNutrientScore(scoreTable[NUTRIENT_TYPES.FIBERS][FOOD_TYPE.SOLID], 3)).toBe(3);
  expect(score.calculateNutrientScore(scoreTable[NUTRIENT_TYPES.PROTEINS][FOOD_TYPE.SOLID], 5)).toBe(3);
  expect(score.calculateNutrientScore(scoreTable[NUTRIENT_TYPES.FRUIT_PERCENTAGE][FOOD_TYPE.SOLID], 42)).toBe(1);

})

test('Test another calculation without special case', () => {
  const score = new NutriScore();
  const result = score.calculate({
    "proteins": 5,
    "energy": 0,
    "fibers": 3,
    "fruit_percentage": 42,
    "saturated_fats": 2,
    "sodium": 500,
    "sugar": 22
  }, FOOD_TYPE.SOLID);
  expect(result).toBe(3);
})

test('Test different calculation without special case', () => {
  const score = new NutriScore();
  const result = score.calculate({
    "proteins": 2,
    "energy": 0,
    "fibers": 4,
    "fruit_percentage": 60,
    "saturated_fats": 2,
    "sodium": 500,
    "sugar": 10
  }, FOOD_TYPE.SOLID);
  expect(result).toBe(2);
})