class UpperCaseError extends Error {
    constructor(letter) {
      const message = `Invalid input: '${letter}' is not an uppercase letter.`;
      super(message);
      this.name = "UpperCaseError";
    }
  }

  function isLetterUpperCase(letter) {
    if (!/^[A-Z]$/.test(letter)) {
      throw new UpperCaseError(letter);
    }
    console.log(`'${letter}' is a valid uppercase letter.`);
  }

  try {
    isLetterUpperCase('A'); 
    isLetterUpperCase('a'); // エラーを投げる
  } catch (error) {
    console.error(error.message);
  }
  