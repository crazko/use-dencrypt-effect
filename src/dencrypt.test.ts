import { waitFor } from "@testing-library/dom";
import { dencrypt } from "./";

test("accepts initial value", () => {
  const initialValue = "value";
  let result = "";

  dencrypt({
    initialValue,
    callback: (value) => {
      result = value;
    },
  });

  expect(result).toBe(initialValue);
});

test("changes value with text effect", async () => {
  jest.useFakeTimers();

  let result = "";

  const setValue = dencrypt({
    callback: (value) => {
      result = value;
    },
    chars: ".",
  });

  expect(result).toBe("");

  setValue("foo");

  await waitFor(() => expect(result).toBe("."));
  await waitFor(() => expect(result).toBe(".."));
  await waitFor(() => expect(result).toBe("..."));
  await waitFor(() => expect(result).toBe("f.."));
  await waitFor(() => expect(result).toBe("fo."));
  await waitFor(() => expect(result).toBe("foo"));

  setValue("hi");

  await waitFor(() => expect(result).toBe(".oo"));
  await waitFor(() => expect(result).toBe("..o"));
  await waitFor(() => expect(result).toBe("..."));
  await waitFor(() => expect(result).toBe("h.."));
  await waitFor(() => expect(result).toBe("hi."));
  await waitFor(() => expect(result).toBe("hi"));
});
