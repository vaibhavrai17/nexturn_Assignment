function sendNotification(notificationService, message) {
  if (!notificationService || typeof notificationService.send !== "function") {
    throw new Error("Invalid notification service");
  }

  if (!message || typeof message !== "string" || message.trim() === "") {
    return "Invalid message";
  }

  const status = notificationService.send(message);
  return status ? "Notification Sent" : "Failed to Send";
}

module.exports = { sendNotification };
