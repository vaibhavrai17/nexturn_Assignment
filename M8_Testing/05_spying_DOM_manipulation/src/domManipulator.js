function toggleVisibility(element) {
  if (!element || !(element instanceof HTMLElement)) {
    throw new Error("Invalid element provided");
  }

  element.style.display = element.style.display === "none" ? "block" : "none";
}

module.exports = { toggleVisibility };
