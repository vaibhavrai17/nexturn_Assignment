const { sendNotification } = require("../src/notificationService");

describe("sendNotification", () => {
  let mockNotificationService;

  beforeEach(() => {
    mockNotificationService = {
      send: jest.fn(),
    };
  });

  test("should return success message when notification is sent successfully", () => {
    mockNotificationService.send.mockReturnValue(true);

    const message = "Hello, World!";
    const result = sendNotification(mockNotificationService, message);

    expect(result).toBe("Notification Sent");
    expect(mockNotificationService.send).toHaveBeenCalledWith(message);
    expect(mockNotificationService.send).toHaveBeenCalledTimes(1);
  });

  test("should return failure message when notification fails to send", () => {
    mockNotificationService.send.mockReturnValue(false);

    const message = "Hello, World!";
    const result = sendNotification(mockNotificationService, message);

    expect(result).toBe("Failed to Send");
    expect(mockNotificationService.send).toHaveBeenCalledWith(message);
    expect(mockNotificationService.send).toHaveBeenCalledTimes(1);
  });

  test("should return 'Invalid message' for empty or invalid message", () => {
    mockNotificationService.send.mockReturnValue(true);

    expect(sendNotification(mockNotificationService, "")).toBe(
      "Invalid message"
    );
    expect(sendNotification(mockNotificationService, "   ")).toBe(
      "Invalid message"
    );
    expect(sendNotification(mockNotificationService, null)).toBe(
      "Invalid message"
    );
    expect(sendNotification(mockNotificationService, 123)).toBe(
      "Invalid message"
    );

    expect(mockNotificationService.send).not.toHaveBeenCalled();
  });

  test("should throw an error when notificationService is invalid", () => {
    expect(() => sendNotification(null, "Hello")).toThrow(
      "Invalid notification service"
    );
    expect(() => sendNotification({}, "Hello")).toThrow(
      "Invalid notification service"
    );
    expect(() => sendNotification({ send: "not a function" }, "Hello")).toThrow(
      "Invalid notification service"
    );
  });
});
