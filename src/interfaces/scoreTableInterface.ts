import { FOOD_TYPE } from "./foodTypes";
import { NUTRIENT_TYPES } from "./nutrientTypes";

interface nutrientScore {
    [FOOD_TYPE.SOLID]: Array<[number, number, number]>
    [FOOD_TYPE.BEVERAGE]: Array<[number, number, number]>
}

export interface scoreTableInterface {
    [NUTRIENT_TYPES.ENERGY]: nutrientScore,
    [NUTRIENT_TYPES.SUGAR]: nutrientScore,
    [NUTRIENT_TYPES.SAT_FATS]: nutrientScore,
    [NUTRIENT_TYPES.SODIUM]: nutrientScore,
    [NUTRIENT_TYPES.FRUIT_PERCENTAGE]: nutrientScore,
    [NUTRIENT_TYPES.FIBERS]: nutrientScore,
    [NUTRIENT_TYPES.PROTEINS]: nutrientScore,
}

export interface nutrientValuesInterface {
    [NUTRIENT_TYPES.ENERGY]: number,
    [NUTRIENT_TYPES.SUGAR]: number,
    [NUTRIENT_TYPES.SAT_FATS]: number,
    [NUTRIENT_TYPES.SODIUM]: number,
    [NUTRIENT_TYPES.FRUIT_PERCENTAGE]: number,
    [NUTRIENT_TYPES.FIBERS]: number,
    [NUTRIENT_TYPES.PROTEINS]: number,
}
