export const formatTextWithHyphens = (text='') => {
  let result = "";
  for (let i = 0; i < (text?.length || 1); i++) {
    if (i % 4 == 0 && i < text.length && i > 0) {
      result += "-";
    }
    result += text[i];
  }
  return result;
};
