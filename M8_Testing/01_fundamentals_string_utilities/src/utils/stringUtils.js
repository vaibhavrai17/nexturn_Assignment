export function capitalize(word) {
  if (typeof word !== "string") return "";
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function reverseString(str) {
  if (typeof str !== "string") return "";
  return str.split("").reverse().join("");
}
