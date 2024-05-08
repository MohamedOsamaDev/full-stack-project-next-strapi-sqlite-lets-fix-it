export const searchAndReplace = (text = "", symbol = "", replacement = "") => {
  // Use regular expression to replace all occurrences of the symbol
  const regex = new RegExp(symbol, "g");
  const newText = text.replace(regex, replacement);
  return newText;
};
