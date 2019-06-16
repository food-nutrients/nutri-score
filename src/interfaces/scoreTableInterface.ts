import { FOOD_TYPE } from "./foodTypes";
import { NUTRIENT_TYPES } from "./nutrientTypes";

interface INutrientScore {
  [FOOD_TYPE.SOLID]: Array<[number, number, number]>;
  [FOOD_TYPE.BEVERAGE]: Array<[number, number, number]>;
}

export interface IScoreTable {
  [NUTRIENT_TYPES.ENERGY]: INutrientScore;
  [NUTRIENT_TYPES.SUGAR]: INutrientScore;
  [NUTRIENT_TYPES.SAT_FATS]: INutrientScore;
  [NUTRIENT_TYPES.SODIUM]: INutrientScore;
  [NUTRIENT_TYPES.FRUIT]: INutrientScore;
  [NUTRIENT_TYPES.FIBERS]: INutrientScore;
  [NUTRIENT_TYPES.PROTEINS]: INutrientScore;
}

export interface INutrientValues {
  [NUTRIENT_TYPES.ENERGY]: number;
  [NUTRIENT_TYPES.SUGAR]: number;
  [NUTRIENT_TYPES.SAT_FATS]: number;
  [NUTRIENT_TYPES.SODIUM]: number;
  [NUTRIENT_TYPES.FRUIT]: number;
  [NUTRIENT_TYPES.FIBERS]: number;
  [NUTRIENT_TYPES.PROTEINS]: number;
}
