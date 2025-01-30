async function fetchAndDisplayUser(apiService, userId, element) {
  if (!apiService || typeof apiService.getUser !== "function") {
    throw new Error("Invalid API service");
  }
  if (!userId) {
    throw new Error("Invalid user ID");
  }
  if (!element || !(element instanceof HTMLElement)) {
    throw new Error("Invalid DOM element");
  }

  try {
    const user = await apiService.getUser(userId);
    if (!user || typeof user.name !== "string" || user.name.trim() === "") {
      throw new Error("Invalid user data");
    }
    element.textContent = `Hello, ${user.name}`;
  } catch (error) {
    element.textContent = error.message;
  }
}

module.exports = { fetchAndDisplayUser };
