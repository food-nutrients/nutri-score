(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.nutriScore = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const foodTypes_1 = require("./interfaces/foodTypes");
const nutrientTypes_1 = require("./interfaces/nutrientTypes");
const scoreTableJSON = __importStar(require("./scoreTable.json"));
const scoreTable = scoreTableJSON;
exports.nutriScore = {
    calculate: (nutrientValues, foodType = foodTypes_1.FOOD_TYPE.SOLID) => {
        const badNutrientsScore = exports.nutriScore.nutrientListScore(nutrientTypes_1.badNutrients, foodType, nutrientValues);
        const goodNutrientsScore = exports.nutriScore.nutrientListScore(nutrientTypes_1.goodNutrients, foodType, nutrientValues);
        const fruitScore = exports.nutriScore.nutrientScore(scoreTable[nutrientTypes_1.NUTRIENT_TYPES.FRUIT][foodType], nutrientValues[nutrientTypes_1.NUTRIENT_TYPES.FRUIT]);
        const fiberScore = exports.nutriScore.nutrientScore(scoreTable[nutrientTypes_1.NUTRIENT_TYPES.FIBERS][foodType], nutrientValues[nutrientTypes_1.NUTRIENT_TYPES.FIBERS]);
        return badNutrientsScore >= 11 && fruitScore < 5 ? badNutrientsScore - fiberScore - fruitScore : badNutrientsScore - goodNutrientsScore;
    },
    calculateClass: (nutrientValues, foodType = foodTypes_1.FOOD_TYPE.SOLID) => {
        const score = exports.nutriScore.calculate(nutrientValues, foodType);
        const classNumber = exports.nutriScore.nutrientScore(scoreTable.nutriClass[foodType], score);
        return String.fromCharCode(64 + classNumber);
    },
    nutrientScore: (nutrientScoreRanges, nutrientValue) => {
        return nutrientScoreRanges.reduce((score, range) => (exports.nutriScore.inRange(nutrientValue, range[0], range[1]) ? range[2] : score), 0);
    },
    nutrientListScore: (nutrientList, foodType, nutrientValues) => {
        return nutrientList.reduce((score, nutrientType) => {
            const currentScore = exports.nutriScore.nutrientScore(scoreTable[nutrientType][foodType], nutrientValues[nutrientType]);
            return score + currentScore;
        }, 0);
    },
    inRange: (x, min, max) => (x - 0.000001 - min) * (x - max) <= 0,
};

},{"./interfaces/foodTypes":2,"./interfaces/nutrientTypes":3,"./scoreTable.json":4}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FOOD_TYPE;
(function (FOOD_TYPE) {
    FOOD_TYPE["SOLID"] = "solid";
    FOOD_TYPE["BEVERAGE"] = "beverage";
})(FOOD_TYPE = exports.FOOD_TYPE || (exports.FOOD_TYPE = {}));

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NUTRIENT_TYPES;
(function (NUTRIENT_TYPES) {
    NUTRIENT_TYPES["ENERGY"] = "energy";
    NUTRIENT_TYPES["SUGAR"] = "sugar";
    NUTRIENT_TYPES["SAT_FATS"] = "saturated_fats";
    NUTRIENT_TYPES["SODIUM"] = "sodium";
    NUTRIENT_TYPES["FRUIT"] = "fruit_percentage";
    NUTRIENT_TYPES["FIBERS"] = "fibers";
    NUTRIENT_TYPES["PROTEINS"] = "proteins";
})(NUTRIENT_TYPES = exports.NUTRIENT_TYPES || (exports.NUTRIENT_TYPES = {}));
exports.badNutrients = [NUTRIENT_TYPES.ENERGY, NUTRIENT_TYPES.SUGAR, NUTRIENT_TYPES.SAT_FATS, NUTRIENT_TYPES.SODIUM];
exports.goodNutrients = [NUTRIENT_TYPES.PROTEINS, NUTRIENT_TYPES.FIBERS, NUTRIENT_TYPES.FRUIT];

},{}],4:[function(require,module,exports){
module.exports={
    "energy": {
        "solid": [
            [-10000, 335, 0],
            [335, 670, 1],
            [670, 1005, 2],
            [1005, 1340, 3],
            [1340, 1675, 4],
            [1675, 2010, 5],
            [2010, 2345, 6],
            [2345, 2680, 7],
            [2680, 3015, 8],
            [3015, 3350, 9],
            [3350, 10000, 10]
        ],
        "beverage": [
            [-10000, 0, 0],
            [0, 30, 1],
            [30, 60, 2],
            [60, 90, 3],
            [90, 120, 4],
            [120, 150, 5],
            [150, 180, 6],
            [180, 210, 7],
            [210, 240, 8],
            [240, 270, 9],
            [270, 10000, 10]
        ]
    },
    "sugar": {
        "solid": [
            [-10000, 4.5, 0],
            [4.5, 9, 1],
            [9, 13.5, 2],
            [13.5, 18, 3],
            [18, 22.5, 4],
            [22.5, 27, 5],
            [27, 31, 6],
            [31, 36, 7],
            [36, 40, 8],
            [40, 45, 9],
            [45, 10000, 10]
        ],
        "beverage": [
            [-10000, 0, 0],
            [0, 1.5, 1],
            [1.5, 3, 2],
            [3, 4.5, 3],
            [4.5, 6, 4],
            [6, 7.5, 5],
            [7.5, 9, 6],
            [9, 10.5, 7],
            [10.5, 12, 8],
            [12, 13.5, 9],
            [13.5, 10000, 10]
        ]
    },
    "fibers": {
        "solid": [[-10000, 0.9, 0], [0.9, 1.9, 1], [1.9, 2.8, 2], [2.8, 3.7, 3], [3.7, 4.7, 4], [4.7, 10000, 5]],
        "beverage": [[-10000, 0.9, 0], [0.9, 1.9, 1], [1.9, 2.8, 2], [2.8, 3.7, 3], [3.7, 4.7, 4], [4.7, 10000, 5]]
    },
    "proteins": {
        "solid": [[-10000, 1.6, 0], [1.6, 3.2, 1], [3.2, 4.8, 2], [4.8, 6.4, 3], [6.4, 8, 4], [8, 10000, 5]],
        "beverage": [[-10000, 1.6, 0], [1.6, 3.2, 1], [3.2, 4.8, 2], [4.8, 6.4, 3], [6.4, 8, 4], [8, 10000, 5]]
    },
    "sodium": {
        "solid": [
            [-10000, 90, 0],
            [90, 180, 1],
            [180, 270, 2],
            [270, 360, 3],
            [360, 450, 4],
            [450, 540, 5],
            [540, 630, 6],
            [630, 720, 7],
            [720, 810, 8],
            [810, 900, 9],
            [900, 10000, 10]
        ],
        "beverage": [
            [-10000, 90, 0],
            [90, 180, 1],
            [180, 270, 2],
            [270, 360, 3],
            [360, 450, 4],
            [450, 540, 5],
            [540, 630, 6],
            [630, 720, 7],
            [720, 810, 8],
            [810, 900, 9],
            [900, 10000, 10]
        ]
    },
    "fruit_percentage": {
        "solid": [[-10000, 40, 0], [40, 60, 1], [60, 80, 2], [80, 10000, 5]],
        "beverage": [[-10000, 40, 0], [40, 60, 2], [60, 80, 4], [80, 10000, 10]]
    },
    "saturated_fats": {
        "solid": [[-10000, 1, 0], [1, 2, 1], [2, 3, 2], [3, 4, 3], [4, 5, 4], [5, 6, 5], [6, 7, 6], [7, 8, 7], [8, 9, 8], [9, 10, 9], [10, 10000, 10]],
        "beverage": [[-10000, 1, 0], [1, 2, 1], [2, 3, 2], [3, 4, 3], [4, 5, 4], [5, 6, 5], [6, 7, 6], [7, 8, 7], [8, 9, 8], [9, 10, 9], [10, 10000, 10]]
    },
    "nutriClass": {
        "solid": [[-10000, -1, 1], [-1, 2, 2], [2, 10, 3], [10, 18, 4], [18, 10000, 5]],
        "beverage": [[-10000, 1, 2], [2, 5, 3], [5, 9, 4], [9, 10000, 5]]
    }
}

},{}]},{},[1])(1)
});
