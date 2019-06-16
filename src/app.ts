import { FOOD_TYPE } from "./interfaces/foodTypes";
import { badNutrients, goodNutrients, NUTRIENT_TYPES } from "./interfaces/nutrientTypes";
import { INutrientValues, IScoreTable } from "./interfaces/scoreTableInterface";
import * as scoreTableJSON from "./scoreTable.json";
const scoreTable: IScoreTable = scoreTableJSON as IScoreTable;

export const nutriScore = {
  calculate: (nutrientValues: INutrientValues, foodType: FOOD_TYPE = FOOD_TYPE.SOLID): number => {
    const badNutrientsScore: number = nutriScore.nutrientListScore(badNutrients, foodType, nutrientValues);
    const goodNutrientsScore: number = nutriScore.nutrientListScore(goodNutrients, foodType, nutrientValues);

    const fruitScore: number = nutriScore.nutrientScore(scoreTable[NUTRIENT_TYPES.FRUIT][foodType], nutrientValues[NUTRIENT_TYPES.FRUIT]);
    const fiberScore: number = nutriScore.nutrientScore(scoreTable[NUTRIENT_TYPES.FIBERS][foodType], nutrientValues[NUTRIENT_TYPES.FIBERS]);

    return badNutrientsScore >= 11 && fruitScore < 5 ? badNutrientsScore - fiberScore - fruitScore : badNutrientsScore - goodNutrientsScore;
  },

  calculateClass: (nutrientValues: INutrientValues, foodType: FOOD_TYPE = FOOD_TYPE.SOLID): string => {
    const score = nutriScore.calculate(nutrientValues, foodType);
    const classNumber = nutriScore.nutrientScore(scoreTable.nutriClass[foodType], score);
    return String.fromCharCode(64 + classNumber);
  },

  nutrientScore: (nutrientScoreRanges: Array<[number, number, number]>, nutrientValue: number): number => {
    return nutrientScoreRanges.reduce((score: number, range: number[]) => (nutriScore.inRange(nutrientValue, range[0], range[1]) ? range[2] : score), 0);
  },

  nutrientListScore: (nutrientList: NUTRIENT_TYPES[], foodType: FOOD_TYPE, nutrientValues: INutrientValues): number => {
    return nutrientList.reduce((score: number, nutrientType: NUTRIENT_TYPES): number => {
      const currentScore: number = nutriScore.nutrientScore(scoreTable[nutrientType][foodType], nutrientValues[nutrientType]);
      return score + currentScore;
    }, 0);
  },

  /**
   * Checks whether a number is inside range (min, max]
   */
  inRange: (x: number, min: number, max: number): boolean => (x - 0.000001 - min) * (x - max) <= 0,
};
