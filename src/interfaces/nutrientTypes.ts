export enum NUTRIENT_TYPES {
    ENERGY = "energy",
    SUGAR = "sugar",
    SAT_FATS = "saturated_fats",
    SODIUM = "sodium",
    FRUIT_PERCENTAGE = "fruit_percentage",
    FIBERS = "fibers",
    PROTEINS = "proteins",
}

export const badNutrients: NUTRIENT_TYPES[] = [NUTRIENT_TYPES.ENERGY, NUTRIENT_TYPES.SUGAR, NUTRIENT_TYPES.SAT_FATS, NUTRIENT_TYPES.SODIUM];
export const goodNutrients: NUTRIENT_TYPES[] = [NUTRIENT_TYPES.PROTEINS, NUTRIENT_TYPES.FIBERS, NUTRIENT_TYPES.FRUIT_PERCENTAGE];
