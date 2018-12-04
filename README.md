> Once you finally understand monads, you lose the ability to explain monads to others.
>
> _Douglas Crockford_

# Magic Boxes

[![Greenkeeper badge](https://badges.greenkeeper.io/SirMoustache/magic-boxes.svg)](https://greenkeeper.io/)

This is toy realization of Monads just to understand them. Well, that was the main idea.  :/

## Installation

`npm install --save magic-boxes`

## IO (Input/Output) Monad

So this is like a cheat in FP world. Impure function stays pure until you run it. So push this run to the edges or even outside of applications with lazy functions.

Usage 

```javaScript
import { IO } from 'magic-boxes';
```

## Building yourself

```bash
git clone https://github.com/SirMoustache/magic-boxes.git
cd magic-boxes
npm install
```

Build
```bash
npm run build
```

Prettify files
```bash
npm run prettify
```

Test
```bash
npm test
```

Publish to npm
```bash
npm publish
```

Bumping a patch version
```bash
npm version patch
```
## TODO
- [ ] IO Monad
- [ ] IO Monat examples
- [ ] More items to TODO list