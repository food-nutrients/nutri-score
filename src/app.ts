import { FOOD_TYPE } from "./interfaces/foodTypes";
import { badNutrients, goodNutrients, NUTRIENT_TYPES } from "./interfaces/nutrientTypes";
import { INutrientValues, IScoreTable } from "./interfaces/scoreTableInterface";

import scoreTableJSON from "./scoreTable.json";
const scoreTable: IScoreTable = scoreTableJSON as IScoreTable;

export default class NutriScore {
    public calculate(nutrientValues: INutrientValues, foodType: FOOD_TYPE) {
        const badNutrientsScore = this.calculateNutrientListScore(badNutrients, foodType, nutrientValues);
        const goodNutrientsScore = this.calculateNutrientListScore(goodNutrients, foodType, nutrientValues);

        const fruitScore = this.calculateNutrientScore(scoreTable[NUTRIENT_TYPES.FRUIT_PERCENTAGE][foodType], nutrientValues[NUTRIENT_TYPES.FRUIT_PERCENTAGE]);
        const fiberScore = this.calculateNutrientScore(scoreTable[NUTRIENT_TYPES.FIBERS][foodType], nutrientValues[NUTRIENT_TYPES.FIBERS]);
        return (badNutrientsScore >= 11 && fruitScore < 5) ? badNutrientsScore - fiberScore - fruitScore : badNutrientsScore - goodNutrientsScore;
    }

    public calculateNutrientScore(nutrientScoreRanges: Array<[number, number, number]>, nutrientValue: number): number {
        return nutrientScoreRanges.reduce((score: number, range: number[]) => ((this.inRange(nutrientValue, range[0], range[1])) ? range[2] : score), 0);
    }
    private calculateNutrientListScore(nutrientList: NUTRIENT_TYPES[], foodType: FOOD_TYPE, nutrientValues: INutrientValues) {
        const reducer = (score: number, nutrientType: NUTRIENT_TYPES) => {
            return score + this.calculateNutrientScore(scoreTable[nutrientType][foodType], nutrientValues[nutrientType]);
        };
        return nutrientList.reduce(reducer, 0);
    }

    private inRange = (x: number, min: number, max: number): boolean => (x - 0.000001 - min) * (x - max) <= 0;
}
