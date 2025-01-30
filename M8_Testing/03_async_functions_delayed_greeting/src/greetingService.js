function delayedGreeting(name, delay) {
  return new Promise((resolve) => {
    if (typeof name !== "string" || name.trim() === "") {
      name = "Guest";
    }
    if (typeof delay !== "number" || delay < 0) {
      delay = 0;
    }

    setTimeout(() => {
      resolve(`Hello, ${name}!`);
    }, delay);
  });
}

module.exports = { delayedGreeting };
