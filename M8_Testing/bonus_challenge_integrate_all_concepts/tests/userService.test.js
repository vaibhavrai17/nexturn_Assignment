const { fetchAndDisplayUser } = require("../src/userService");

describe("fetchAndDisplayUser", () => {
  let element;
  let mockApiService;

  beforeEach(() => {
    element = document.createElement("div");

    mockApiService = {
      getUser: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should display user name when API call is successful", async () => {
    const userId = "123";
    const mockUser = { name: "John Doe" };
    mockApiService.getUser.mockResolvedValue(mockUser);

    await fetchAndDisplayUser(mockApiService, userId, element);

    expect(mockApiService.getUser).toHaveBeenCalledWith(userId);
    expect(element.textContent).toBe("Hello, John Doe");
  });

  test("should display error when API call fails", async () => {
    const userId = "123";
    const errorMessage = "API Error";
    mockApiService.getUser.mockRejectedValue(new Error(errorMessage));

    await fetchAndDisplayUser(mockApiService, userId, element);

    expect(mockApiService.getUser).toHaveBeenCalledWith(userId);
    expect(element.textContent).toBe(errorMessage);
  });

  test("should display error when user data is invalid", async () => {
    const userId = "123";
    const invalidUsers = [{}, { name: "" }, { name: null }, { name: 123 }];

    for (const invalidUser of invalidUsers) {
      mockApiService.getUser.mockResolvedValue(invalidUser);
      await fetchAndDisplayUser(mockApiService, userId, element);
      expect(element.textContent).toBe("Invalid user data");
    }
  });

  test("should handle network timeout", async () => {
    const userId = "123";
    mockApiService.getUser.mockImplementation(
      () =>
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Network timeout")), 100)
        )
    );

    await fetchAndDisplayUser(mockApiService, userId, element);

    expect(mockApiService.getUser).toHaveBeenCalledWith(userId);
    expect(element.textContent).toBe("Network timeout");
  });

  test("should handle multiple consecutive calls", async () => {
    const userId = "123";
    mockApiService.getUser
      .mockResolvedValueOnce({ name: "John Doe" })
      .mockRejectedValueOnce(new Error("API Error"))
      .mockResolvedValueOnce({ name: "Jane Doe" });

    await fetchAndDisplayUser(mockApiService, userId, element);
    expect(element.textContent).toBe("Hello, John Doe");

    await fetchAndDisplayUser(mockApiService, userId, element);
    expect(element.textContent).toBe("API Error");

    await fetchAndDisplayUser(mockApiService, userId, element);
    expect(element.textContent).toBe("Hello, Jane Doe");

    expect(mockApiService.getUser).toHaveBeenCalledTimes(3);
  });

  test("should throw error for missing or invalid API service", async () => {
    const userId = "123";
    await expect(fetchAndDisplayUser(null, userId, element)).rejects.toThrow(
      "Invalid API service"
    );
    await expect(fetchAndDisplayUser({}, userId, element)).rejects.toThrow(
      "Invalid API service"
    );
  });

  test("should throw error for missing or invalid user ID", async () => {
    await expect(
      fetchAndDisplayUser(mockApiService, null, element)
    ).rejects.toThrow("Invalid user ID");
    await expect(
      fetchAndDisplayUser(mockApiService, "", element)
    ).rejects.toThrow("Invalid user ID");
  });

  test("should throw error for missing or invalid DOM element", async () => {
    const userId = "123";
    await expect(
      fetchAndDisplayUser(mockApiService, userId, null)
    ).rejects.toThrow("Invalid DOM element");
    await expect(
      fetchAndDisplayUser(mockApiService, userId, "not-an-element")
    ).rejects.toThrow("Invalid DOM element");
  });
});
