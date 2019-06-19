# Nutri-Score Calculator

<p align="center">
  <img width="568" height="307" src="https://github.com/food-nutrients/nutri-score/raw/master/assets/images/nutri-score-logo.png" alt="Nutri Score logo">
</p>

> The goal of the project is to provide simple library that can calculate the Nutri-Score.

![Release](https://img.shields.io/github/release/food-nutrients/nutri-score.svg) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/food-nutrients/nutri-score.svg) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/1215d67606784c51be6e00b5c277c8ea)](https://www.codacy.com/app/kolarski/nutri-score?utm_source=github.com&utm_medium=referral&utm_content=food-nutrients/nutri-score&utm_campaign=Badge_Grade) <a href="https://codeclimate.com/github/food-nutrients/nutri-score/maintainability"><img src="https://api.codeclimate.com/v1/badges/9aa2c2c7ac55eea0c049/maintainability" /></a> <a href="https://codeclimate.com/github/food-nutrients/nutri-score/test_coverage"><img src="https://api.codeclimate.com/v1/badges/9aa2c2c7ac55eea0c049/test_coverage" /></a> ![Dependencies](https://img.shields.io/david/food-nutrients/nutri-score.svg) [![Build Status](https://travis-ci.org/food-nutrients/nutri-score.svg?branch=master)](https://travis-ci.org/food-nutrients/nutri-score)

## What is the Nutri-Score ?

The Nutri-Score is a nutrition label that converts the nutritional value of products into a simple code consisting of 5 letters, each with its own colour.

Each product is awarded a score based on a scientific algorithm.

This formula takes into account the nutrients to avoid (energy value and the amount of sugars, saturated fats and salt) and the positive ones (the amount of fibre, protein, fruit, vegetables and nuts).

You can therefore see at a glance which products are recommended and which should be avoided.

> Source: <https://nutriscore.colruytgroup.com/colruytgroup/en/about-nutri-score/>


Paper: <https://pdfs.semanticscholar.org/3d1c/c206bc286bb5f80452821a0d26ff9e55b387.pdf>
<p align="center">
  <img width="380" height="300" src="https://github.com/food-nutrients/nutri-score/raw/master/assets/images/nutri-scores.png" alt="Nutri Score labels example">
</p>

## Usage

### Import the library

```html
<script src="https://cdn.jsdelivr.net/npm/nutri-score/nutriScore.js"></script>
```

or

```bash
yarn add nutri-score
```

or

```
npm install nutri-score --save
```

### Calculate the nutri-score class:

```js
import { nutriScore } from "nutri-score";

const result = nutriScore.calculateClass({
  energy: 0,
  fibers: 4,
  fruit_percentage: 60,
  proteins: 2,
  saturated_fats: 2,
  sodium: 500,
  sugar: 10
});

console.log(result); // Output: "B"
```

For more methods & usage refer to the documentation bellow

Note: TypeScript definition are included in the project

## Documentation

... Work in progress ...

## Contribution

Feel free to add suggestions, PRs, comments and bug reports.

## Authors

Alex Kolarski (aleks.rk@gmail.com)

## License

(The MIT License)

Copyright (c) 2019

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
