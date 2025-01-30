const { delayedGreeting } = require("../src/greetingService");

describe("delayedGreeting", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("Basic functionality", () => {
    test("should resolve with correct greeting message", async () => {
      const name = "Alice";
      const delay = 1000;
      const expectedGreeting = "Hello, Alice!";

      const greetingPromise = delayedGreeting(name, delay);
      jest.advanceTimersByTime(delay);
      jest.runAllTimers();

      const result = await greetingPromise;
      expect(result).toBe(expectedGreeting);
    });
  });

  describe("Timing behavior", () => {
    test("should not resolve before the specified delay", () => {
      const name = "Bob";
      const delay = 2000;
      let resolved = false;

      const promise = delayedGreeting(name, delay);
      promise.then(() => (resolved = true));

      jest.advanceTimersByTime(delay - 1);
      expect(resolved).toBe(false);
    });

    test("should resolve after exact delay time", async () => {
      const name = "Charlie";
      const delay = 1500;
      let resolved = false;

      const promise = delayedGreeting(name, delay);
      promise.then(() => (resolved = true));

      jest.advanceTimersByTime(delay);
      jest.runAllTimers();
      await promise;

      expect(resolved).toBe(true);
    });
  });

  describe("Handling multiple delays", () => {
    test("should handle multiple concurrent delays correctly", async () => {
      const promises = [
        delayedGreeting("Dave", 1000),
        delayedGreeting("Eve", 2000),
      ];

      jest.advanceTimersByTime(1000);
      jest.runAllTimers();
      const firstResult = await promises[0];
      expect(firstResult).toBe("Hello, Dave!");

      jest.advanceTimersByTime(1000);
      jest.runAllTimers();
      const secondResult = await promises[1];
      expect(secondResult).toBe("Hello, Eve!");
    });

    test("should handle zero delay", async () => {
      const name = "Frank";
      const delay = 0;

      const promise = delayedGreeting(name, delay);
      jest.advanceTimersByTime(0);
      jest.runAllTimers();

      const result = await promise;
      expect(result).toBe("Hello, Frank!");
    });
  });

  describe("Edge cases", () => {
    test("should default to 'Guest' when name is empty or invalid", async () => {
      const delay = 500;

      const promise1 = delayedGreeting("", delay);
      const promise2 = delayedGreeting(null, delay);
      const promise3 = delayedGreeting(undefined, delay);
      const promise4 = delayedGreeting(123, delay);

      jest.advanceTimersByTime(delay);
      jest.runAllTimers();

      const result1 = await promise1;
      const result2 = await promise2;
      const result3 = await promise3;
      const result4 = await promise4;

      expect(result1).toBe("Hello, Guest!");
      expect(result2).toBe("Hello, Guest!");
      expect(result3).toBe("Hello, Guest!");
      expect(result4).toBe("Hello, Guest!");
    });

    test("should default to zero delay for negative or invalid delays", async () => {
      const promise1 = delayedGreeting("George", -100);
      const promise2 = delayedGreeting("Hannah", "invalid");

      jest.advanceTimersByTime(0);
      jest.runAllTimers();

      expect(await promise1).toBe("Hello, George!");
      expect(await promise2).toBe("Hello, Hannah!");
    });
  });
});
