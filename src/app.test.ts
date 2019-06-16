// tslint:disable: no-magic-numbers newline-per-chained-call
import { nutriScore } from "./app";
import { FOOD_TYPE } from "./interfaces/foodTypes";
import { NUTRIENT_TYPES } from "./interfaces/nutrientTypes";
import { IScoreTable } from "./interfaces/scoreTableInterface";
import * as scoreTableJSON from "./scoreTable.json";
const scoreTable: IScoreTable = scoreTableJSON as IScoreTable;

test("Test nutrient table score algo", () => {
  const scoreTable2: Array<[number, number, number]> = [
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
    [270, +Infinity, 10],
  ];
  expect(nutriScore.nutrientScore(scoreTable2, -1000)).toBe(0);
  expect(nutriScore.nutrientScore(scoreTable2, 0)).toBe(0);
  expect(nutriScore.nutrientScore(scoreTable2, 1)).toBe(0);
  expect(nutriScore.nutrientScore(scoreTable2, 30)).toBe(1);
  expect(nutriScore.nutrientScore(scoreTable2, 31)).toBe(2);
  expect(nutriScore.nutrientScore(scoreTable2, 10000)).toBe(10);
});
// tslint:disable: no-string-literal
test("Test inRange method", () => {
  expect(nutriScore.inRange(5, 1, 10)).toBeTruthy();
  expect(nutriScore.inRange(11, 1, 10)).toBeFalsy();
  expect(nutriScore.inRange(0, 1, 10)).toBeFalsy();
  expect(nutriScore.inRange(-5, -15, -3)).toBeTruthy();
  expect(nutriScore.inRange(0, -1, 0)).toBeTruthy();
  expect(nutriScore.inRange(-1, -1, 0)).toBeFalsy();
  expect(nutriScore.inRange(-0.99999, -1, 0)).toBeTruthy();
});

test("Test calculation with special case", () => {
  const result: number = nutriScore.calculate(
    {
      energy: 2000,
      fibers: 3,
      fruit_percentage: 42,
      proteins: 5,
      saturated_fats: 3,
      sodium: 500,
      sugar: 22,
    },
    FOOD_TYPE.SOLID,
  );
  expect(result).toBe(12);
});

test("Test individual nutrients", () => {
  expect(nutriScore.nutrientScore(scoreTable[NUTRIENT_TYPES.FIBERS][FOOD_TYPE.SOLID], 3)).toBe(3);
  expect(nutriScore.nutrientScore(scoreTable[NUTRIENT_TYPES.PROTEINS][FOOD_TYPE.SOLID], 5)).toBe(3);
  expect(nutriScore.nutrientScore(scoreTable[NUTRIENT_TYPES.FRUIT][FOOD_TYPE.SOLID], 42)).toBe(1);
});

test("Test another calculation without special case", () => {
  const result: number = nutriScore.calculate(
    {
      energy: 0,
      fibers: 3,
      fruit_percentage: 42,
      proteins: 5,
      saturated_fats: 2,
      sodium: 500,
      sugar: 22,
    },
    FOOD_TYPE.SOLID,
  );
  expect(result).toBe(3);
});

test("Test different calculation without special case", () => {
  const result: number = nutriScore.calculate(
    {
      energy: 0,
      fibers: 4,
      fruit_percentage: 60,
      proteins: 2,
      saturated_fats: 2,
      sodium: 500,
      sugar: 10,
    },
    FOOD_TYPE.SOLID,
  );
  expect(result).toBe(2);
});

test("Test different calculation without special case", () => {
  const result: string = nutriScore.calculateClass(
    {
      energy: 0,
      fibers: 4,
      fruit_percentage: 60,
      proteins: 2,
      saturated_fats: 2,
      sodium: 500,
      sugar: 10,
    },
    FOOD_TYPE.SOLID,
  );
  expect(result).toBe("B");
});
