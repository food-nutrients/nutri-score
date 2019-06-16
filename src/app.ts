import { FOOD_TYPE } from "./interfaces/foodTypes";
import { badNutrients, goodNutrients, NUTRIENT_TYPES } from "./interfaces/nutrientTypes";
import { INutrientValues, IScoreTable } from "./interfaces/scoreTableInterface";
import * as scoreTableJSON from "./scoreTable.json";
const scoreTable: IScoreTable = scoreTableJSON as IScoreTable;

export class NutriScore {
  public calculate(nutrientValues: INutrientValues, foodType: FOOD_TYPE): number {
    const badNutrientsScore: number = this.nutrientListScore(badNutrients, foodType, nutrientValues);
    const goodNutrientsScore: number = this.nutrientListScore(goodNutrients, foodType, nutrientValues);

    const fruitScore: number = this.nutrientScore(scoreTable[NUTRIENT_TYPES.FRUIT][foodType], nutrientValues[NUTRIENT_TYPES.FRUIT]);
    const fiberScore: number = this.nutrientScore(scoreTable[NUTRIENT_TYPES.FIBERS][foodType], nutrientValues[NUTRIENT_TYPES.FIBERS]);

    return badNutrientsScore >= 11 && fruitScore < 5 ? badNutrientsScore - fiberScore - fruitScore : badNutrientsScore - goodNutrientsScore;
  }

  public nutrientScore(nutrientScoreRanges: Array<[number, number, number]>, nutrientValue: number): number {
    return nutrientScoreRanges.reduce((score: number, range: number[]) => (this.inRange(nutrientValue, range[0], range[1]) ? range[2] : score), 0);
  }

  private nutrientListScore(nutrientList: NUTRIENT_TYPES[], foodType: FOOD_TYPE, nutrientValues: INutrientValues): number {
    return nutrientList.reduce((score: number, nutrientType: NUTRIENT_TYPES): number => {
      const currentScore: number = this.nutrientScore(scoreTable[nutrientType][foodType], nutrientValues[nutrientType]);
      return score + currentScore;
    }, 0);
  }

  /**
   * Checks whether a number is inside range (min, max]
   */
  private readonly inRange = (x: number, min: number, max: number): boolean => (x - 0.000001 - min) * (x - max) <= 0;
}
