import { renderHook, act } from "@testing-library/react-hooks";
import { useDencrypt } from "./";

test("accepts initial value", () => {
  const initialValue = "value";

  const { result } = renderHook(() => useDencrypt(initialValue));

  expect(result.current[0]).toBe(initialValue);
});

test("changes value with text effect", async () => {
  const { result, waitForNextUpdate, rerender } = renderHook(() =>
    useDencrypt({
      chars: ".",
    })
  );

  expect(result.current[0]).toBe(undefined);

  act(() => {
    result.current[1]("foo");
  });

  await waitForNextUpdate();
  expect(result.current[0]).toBe("");

  await waitForNextUpdate();
  expect(result.current[0]).toBe(".");

  rerender();
  await waitForNextUpdate();

  expect(result.current[0]).toBe("..");

  rerender();
  await waitForNextUpdate();

  expect(result.current[0]).toBe("...");

  rerender();
  await waitForNextUpdate();

  expect(result.current[0]).toBe("f..");

  rerender();
  await waitForNextUpdate();

  expect(result.current[0]).toBe("fo.");

  rerender();
  await waitForNextUpdate();

  expect(result.current[0]).toBe("foo");

  act(() => {
    result.current[1]("hi");
  });

  rerender();
  await waitForNextUpdate();

  expect(result.current[0]).toBe(".oo");

  rerender();
  await waitForNextUpdate();

  expect(result.current[0]).toBe("..o");

  rerender();
  await waitForNextUpdate();

  expect(result.current[0]).toBe("...");

  rerender();
  await waitForNextUpdate();

  expect(result.current[0]).toBe("h..");

  rerender();
  await waitForNextUpdate();

  expect(result.current[0]).toBe("hi.");

  rerender();
  await waitForNextUpdate();

  expect(result.current[0]).toBe("hi");
});
