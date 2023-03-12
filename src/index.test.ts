import { renderHook, act, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";

import { useDencrypt } from "./";

test("accepts initial value", () => {
  const initialValue = "value";

  const { result } = renderHook(() => useDencrypt(initialValue));

  expect(result.current[0]).toBe(initialValue);
});

test("changes value with text effect", async () => {
  const { result } = renderHook(() =>
    useDencrypt({
      chars: ".",
    })
  );

  expect(result.current[0]).toBe(undefined);

  act(() => {
    result.current[1]("foo");
  });

  await waitFor(() => expect(result.current[0]).toBe(""));
  await waitFor(() => expect(result.current[0]).toBe("."));
  await waitFor(() => expect(result.current[0]).toBe(".."));
  await waitFor(() => expect(result.current[0]).toBe("..."));
  await waitFor(() => expect(result.current[0]).toBe("f.."));
  await waitFor(() => expect(result.current[0]).toBe("fo."));
  await waitFor(() => expect(result.current[0]).toBe("foo"));

  act(() => {
    result.current[1]("hi");
  });

  await waitFor(() => expect(result.current[0]).toBe(".oo"));
  await waitFor(() => expect(result.current[0]).toBe("..o"));
  await waitFor(() => expect(result.current[0]).toBe("..."));
  await waitFor(() => expect(result.current[0]).toBe("h.."));
  await waitFor(() => expect(result.current[0]).toBe("hi."));
  await waitFor(() => expect(result.current[0]).toBe("hi"));
});
