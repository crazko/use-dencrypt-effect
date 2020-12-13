import { useDencrypt } from "./";
import { renderHook, act } from "@testing-library/react-hooks";

const options = { chars: ["."] };

describe("useDencrypt", () => {
  it("creates text effect", async () => {
    const { result, waitForNextUpdate, rerender } = renderHook(() =>
      useDencrypt(options)
    );

    expect(result.current.result).toBe("");
    expect(typeof result.current.dencrypt).toBe("function");

    act(() => {
      result.current.dencrypt("foo");
    });

    await waitForNextUpdate();
    expect(result.current.result).toBe(".");

    rerender();
    await waitForNextUpdate();

    expect(result.current.result).toBe("..");

    rerender();
    await waitForNextUpdate();

    expect(result.current.result).toBe("...");

    rerender();
    await waitForNextUpdate();

    expect(result.current.result).toBe("f..");

    rerender();
    await waitForNextUpdate();

    expect(result.current.result).toBe("fo.");

    rerender();
    await waitForNextUpdate();

    expect(result.current.result).toBe("foo");
  });

  it("creates text effect with initial value", async () => {
    const { result, waitForNextUpdate, rerender } = renderHook(() =>
      useDencrypt("bar", options)
    );

    expect(result.current.result).toBe("bar");
    expect(typeof result.current.dencrypt).toBe("function");

    act(() => {
      result.current.dencrypt("foo");
    });

    await waitForNextUpdate();
    expect(result.current.result).toBe(".ar");

    rerender();
    await waitForNextUpdate();

    expect(result.current.result).toBe("..r");

    rerender();
    await waitForNextUpdate();

    expect(result.current.result).toBe("...");

    rerender();
    await waitForNextUpdate();

    expect(result.current.result).toBe("f..");

    rerender();
    await waitForNextUpdate();

    expect(result.current.result).toBe("fo.");

    rerender();
    await waitForNextUpdate();

    expect(result.current.result).toBe("foo");
  });
});
