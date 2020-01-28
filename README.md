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

const values = ["useDencrypt", "Customizable", "React Hook", "Text Effect"];

const Example = () => {
  const { result, deEncrypt } = useDeEncrypt();

  React.useEffect(() => {
    let i = 0;

    const action = setInterval(() => {
      deEncrypt(values[i]);

      i = i === values.length - 1 ? 0 : i + 1;
    }, 2000);

    return () => clearInterval(action);
  }, []);

  return <div>{result}</div>;
};
```

## Custom Options

Type: `Object`.

All parameters are optional.

### chars

Type: `Array<string>`. Default: `["-", ".", "/", "^", "*", "!", "}", "<", "~", "$", "0", "1", "2", "3", "4", "5", "a", "b", "c", "d", "e", "f"];`

An array of characters used for the effect. Picked by random.

### interval

Type: `number`. Default: `50`.

Number of miliseconds it takes for every animation step (one character).

## Other Examples

![Example 1](https://github.com/crazko/use-dencrypt-effect/raw/master/docs/example1.gif)

```js
const options: {
  chars: ["_"]
}

const Example = () => {
  const { result, deEncrypt } = useDeEncrypt(options);

  // ...
```

---

This hook is created using [create-react-hook](https://github.com/Hermanya/create-react-hook).
