export const getFirstCharacters = (str: string) => {
    const words = str.split(" ");
    let firstCharacters = "";
    if (words.length >= 2) {
      firstCharacters += words[0][0];
      firstCharacters += words[1][0];
    } else if (words.length === 1) {
      firstCharacters += words[0][0];
    }
    return firstCharacters;
  };