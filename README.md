<div align="center">

![Dencrypt example](https://github.com/crazko/use-dencrypt-effect/raw/master/docs/dencrypt.gif)

</div>

# use-dencrypt-effect

[![NPM](https://img.shields.io/npm/v/use-dencrypt-effect.svg)](https://www.npmjs.com/package/use-dencrypt-effect)


A custom [React hook](https://reactjs.org/docs/hooks-intro.html) generating crypting text effect.

**Live demo**: https://codesandbox.io/s/use-dencrypt-effect-7td0f.

## Install

```bash
npm install --save use-dencrypt-effect
```

## Usage

```tsx
import * as React from "react";

import { useDencrypt } from "use-dencrypt-effect";

const Example = () => {
  const [value, setValue] = useDencrypt("initialValue");

  return <div onClick={() => setValue("newValue")}>{value}</div>;
};
```

## API

### useDencrypt(initialValue?, options?)

Returns a tuple `[value, setValue]` consisting of an actual value and a method to set a new value. Just like `useState()` hook.

#### value

Type: `string`

Result of the animation.

#### setValue(newValue)

Sets a value and starts new animation.

Returns a promise which is resolved when animation for `newValue` ends.

##### newValue

Type: `string`

A value used for next animation.

#### initialValue

Type: `string`

Optional value that is returned immediately.

#### options

Type: `Object`

All parameters are optional.

##### chars

Type: `string`\
Default: `-./^*!}<~$012345abcdef`

Characters used for the effect. Picked by random.

##### interval

Type: `number`\
Default: `50`

Number of miliseconds it takes for every animation step (one character).

## Examples

See [`./src/examples`](./src/examples) directory.

- [Custom Characters](./src/examples/custom-characters.tsx)
- [Initial Value](./src/examples/initial-value.tsx)
- [Loop Through Values](./src/examples/loop.tsx)
- [Use without React hook](./src/examples/without-hook.tsx)

### One character

![](https://github.com/crazko/use-dencrypt-effect/raw/master/docs/example1.gif)

```js
const Example = () => {
  const [value, setValue] = useDencrypt({ chars: "_" });

  // ...
```

### Run effect on hover

[Live Example](https://vojdivon.sk/) | [Source Code](https://github.com/ParalelnaPolisKE/vojdivon.sk/blob/54fcbf5c573de485b5d6ed2051d515da7f0bf252/src/index.jsx#L43)
