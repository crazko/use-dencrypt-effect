<div align="center">

![Dencrypt example](https://github.com/crazko/use-dencrypt-effect/raw/master/docs/dencrypt.gif)

</div>

# use-dencrypt-effect

[![NPM](https://img.shields.io/npm/v/use-dencrypt-effect.svg)](https://www.npmjs.com/package/use-dencrypt-effect) [![Open in Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/organization/repository)


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

See [`./examples/src`](/examples/src) directory.

- [Custom Characters](/examples/src/custom-characters.jsx)
- [Initial Value](/examples/src/initial-value.jsx)
- [Loop Through Values](/examples/src/loop.jsx)
- [Use without React hook](/examples/src/without-hook.jsx)

### One character

![](https://github.com/crazko/use-dencrypt-effect/raw/master/docs/example1.gif)

```js
const Example = () => {
  const [value, setValue] = useDencrypt({ chars: "_" });

  // ...
```

### Run effect on hover

[Live Example](https://vojdivon.sk/) | [Source Code](https://github.com/ParalelnaPolisKE/vojdivon.sk/blob/ce04fb05212dce8323fef8fba73963544ce2eda7/src/pages/index.tsx#L69)

---

This hook is created using [create-react-hook](https://github.com/Hermanya/create-react-hook).
