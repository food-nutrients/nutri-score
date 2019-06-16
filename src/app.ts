import { scoreTableInterface, nutrientValuesInterface } from "./interfaces/scoreTableInterface";
import { goodNutrients, badNutrients, NUTRIENT_TYPES } from './interfaces/nutrientTypes';
import { FOOD_TYPE } from './interfaces/foodTypes';

import scoreTableJSON from './scoreTable.json';
let scoreTable: scoreTableInterface = <scoreTableInterface>scoreTableJSON;

export default class NutriScore {
    calculate(nutrientValues: nutrientValuesInterface, foodType: FOOD_TYPE) {
        const badNutrientsScore = this.calculateNutrientListScore(badNutrients, foodType, nutrientValues)
        const goodNutrientsScore = this.calculateNutrientListScore(goodNutrients, foodType, nutrientValues)

        const fruitScore = this.calculateNutrientScore(scoreTable[NUTRIENT_TYPES.FRUIT_PERCENTAGE][foodType], nutrientValues[NUTRIENT_TYPES.FRUIT_PERCENTAGE]);
        const fiberScore = this.calculateNutrientScore(scoreTable[NUTRIENT_TYPES.FIBERS][foodType], nutrientValues[NUTRIENT_TYPES.FIBERS]);
        return (badNutrientsScore >= 11 && fruitScore < 5) ? badNutrientsScore - fiberScore - fruitScore : badNutrientsScore - goodNutrientsScore
    }

    private calculateNutrientListScore(nutrientList: Array<NUTRIENT_TYPES>, foodType: FOOD_TYPE, nutrientValues: nutrientValuesInterface) {
        return nutrientList.reduce((score, nutrientType) => score + this.calculateNutrientScore(scoreTable[nutrientType][foodType], nutrientValues[nutrientType]), 0);
    }

    public calculateNutrientScore(nutrientScoreRanges: Array<[number, number, number]>, nutrientValue: number): number {
        return nutrientScoreRanges.reduce((score: number, range: Array<number>) => ((this.inRange(nutrientValue, range[0], range[1])) ? range[2] : score), 0);
    }

    private inRange = (x: number, min: number, max: number): boolean => (x - 0.000001 - min) * (x - max) <= 0
}