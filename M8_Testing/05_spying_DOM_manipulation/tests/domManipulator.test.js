const { toggleVisibility } = require("../src/domManipulator");

describe("toggleVisibility", () => {
  let element;
  let setDisplaySpy;

  beforeEach(() => {
    // Create a fresh DOM element before each test
    element = document.createElement("div");
    document.body.appendChild(element);

    // Spy on the style object's display property setter
    setDisplaySpy = jest.spyOn(element.style, "display", "set");
  });

  afterEach(() => {
    // Clean up the DOM
    document.body.removeChild(element);
    jest.restoreAllMocks();
  });

  test("should toggle display from visible to none", () => {
    element.style.display = ""; // Default display (visible)

    toggleVisibility(element);

    expect(element.style.display).toBe("none");
    expect(setDisplaySpy).toHaveBeenCalledWith("none");
  });

  test("should toggle display from none to block", () => {
    element.style.display = "none";

    toggleVisibility(element);

    expect(element.style.display).toBe("block");
    expect(setDisplaySpy).toHaveBeenCalledWith("block");
  });

  test("should toggle display from block to none", () => {
    element.style.display = "block";

    toggleVisibility(element);

    expect(element.style.display).toBe("none");
    expect(setDisplaySpy).toHaveBeenCalledWith("none");
  });

  test("should track number of style changes", () => {
    toggleVisibility(element); // visible -> none
    toggleVisibility(element); // none -> block
    toggleVisibility(element); // block -> none

    expect(setDisplaySpy).toHaveBeenCalledTimes(3);
  });

  test("should throw an error if element is null or undefined", () => {
    expect(() => toggleVisibility(null)).toThrow("Invalid element provided");
    expect(() => toggleVisibility(undefined)).toThrow(
      "Invalid element provided"
    );
  });

  test("should throw an error if a non-HTMLElement is passed", () => {
    expect(() => toggleVisibility("not-an-element")).toThrow(
      "Invalid element provided"
    );
    expect(() => toggleVisibility(123)).toThrow("Invalid element provided");
    expect(() => toggleVisibility({})).toThrow("Invalid element provided");
  });
});
