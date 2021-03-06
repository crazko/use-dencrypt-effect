import React from "react";
import { useDencrypt } from "use-dencrypt-effect";

const Link = React.memo(({ children }) => {
  const [value, setValue] = useDencrypt(children);

  return (
    <a href="#" onMouseOver={() => setValue(children)}>
      {value}
    </a>
  );
});

export const InitialValue = () => {
  return (
    <ul>
      <li>
        <Link>Home</Link>
      </li>
      <li>
        <Link>About</Link>
      </li>
      <li>
        <Link>Blog</Link>
      </li>
      <li>
        <Link>Projects</Link>
      </li>
      <li>
        <Link>Contact</Link>
      </li>
    </ul>
  );
};
