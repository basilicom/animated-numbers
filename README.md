# animated-numbers
A lean package for displaying animated numbers.

[![Latest Version on NPM](https://img.shields.io/npm/v/animated-numbers.svg?style=flat-square)](https://npmjs.com/package/animated-numbers)
[![Software License](https://img.shields.io/github/license/basilicom/animated-numbers?style=flat-square)](LICENSE.md)

## Installation

You can install the package via yarn or npm:

```bash
yarn add animated-numbers
```
```bash
npm install animated-numbers --save
```

## Usage

First import the package:

```javascript
import 'animated-numbers';
```
Secondly, including the following HTML snippet where you intend to animate numbers:
```html
<div class="animated-number">
    <div class="animated-number_number">
        <span class="animated-number_number_nr">100</span>
        <span class="animated-number_number_unit">%</span>
    </div>
    <div class="animated-number_text">lorem ipsum</div>
</div>
```

