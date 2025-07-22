import {
  generateFlightId,
  isValidDateString,
  wrapString,
} from "../src/utilities.js";

//Tests for wrapString function
// It splits strings to fit a specified width, adding hyphens when breaking words.

test("wrapString: wrap single word over two lines", () => {
  // Single word longer than limit should break with hyphen and newline
  expect(wrapString("Long", 3)).toBe("Lo-\nng");
});

test("wrapString: wrap multiple words over two lines", () => {
  // Multiple words separated by space should wrap at space if possible
  expect(wrapString("Too long", 4)).toBe("Too\nlong");
});

test("wrapString: wrap complex sentence", () => {
  // Complex sentence with several breaks, testing multiple line wraps and hyphenation
  expect(
    wrapString("This is a complex sentence that needs to be wrapped", 6)
  ).toBe("This\nis a\ncompl-\nex se-\nntence\nthat\nneeds\nto be\nwrapp-\ned");
});

test("wrapString: wrap very long words", () => {
  // Very long words should be broken repeatedly with hyphens and newlines
  expect(
    wrapString(
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa bbbbbbbbbbbbbbbbbbbbbbbbbbbb ccccccccccccccccccccccccccc",
      6
    )
  ).toBe(
    `aaaaa-
aaaaa-
aaaaa-
aaaaa-
aaaaa-
aaaaa-
aaaaa
bbbbb-
bbbbb-
bbbbb-
bbbbb-
bbbbb-
bbb c-
ccccc-
ccccc-
ccccc-
ccccc-
cccccc`
  );
});

// Test for invalid string
// Checks if input strings represent valid dates in DD/MM/YYYY format
test("isValidDateString: invalid string", () => {
  expect(isValidDateString("notavaliddate")).toBe(false);
});

// Test for the wrong amount of "date segments"
test("isValidDateString: wrong number of date segments", () => {
  // Date strings with wrong number of segments separated by slashes should return false
  expect(isValidDateString("12/12/2012/20")).toBe(false);
});

// Test for wrong number of digits in the day
test("isValidDateString: wrong number of digits in day", () => {
  // Day must have exactly two digits, otherwise invalid
  expect(isValidDateString("1/12/2012")).toBe(false);
});

// Test for wrong number of digits in the month
test("isValidDateString: wrong number of digits in month", () => {
  // Month must have exactly two digits, otherwise invalid
  expect(isValidDateString("12/1/2012")).toBe(false);
});

// Test for wrong number of digits in the year
test("isValidDateString: wrong number of digits in year", () => {
  // Year must have exactly four digits, otherwise invalid
  expect(isValidDateString("12/12/201")).toBe(false);
});

// Test for day outside of month's number of day's
test("isValidDateString: day greater than permitted", () => {
  // Day cannot be greater than maximum possible
  expect(isValidDateString("32/81/2812")).toBe(false);
});

// Test for month greater than 12
test("isValidDateString: month greater than 12", () => {
  // Month cannot exceed 12
  expect(isValidDateString("12/13/2012")).toBe(false);
});

// Test for day <= 0
test("isValidDateString: day <= 0", () => {
  // Day cannot be zero or negative
  expect(isValidDateString("00/12/2012")).toBe(false);
});

// Test for month <= 0
test("isValidDateString: month <=0", () => {
  // Month cannot be zero or negative
  expect(isValidDateString("12/00/2012")).toBe(false);
});

// Test for year <= 0
test("isValidDateString: year <= 0", () => {
  // Year cannot be zero or negative
  expect(isValidDateString("12/12/0000")).toBe(false);
});

// Test for valid date
test("isValidDateString: valid date", () => {
  // Valid date string should return true
  expect(isValidDateString("12/12/2012")).toBe(true);
});

///// PUT YOUR TESTS FOR generateFlightId HERE /////
// Generates a flight ID starting with the first two uppercase letters of the airline name
// Test that first two characters are uppercase letters corresponding to airline name

test("generateFlightId: is uppercase", () => {
  expect(generateFlightId("Qantas").substring(0, 2)).toBe("QA");
});

// Test for blank string
// Test empty string input returns undefined
test("generateFlightId: blank string", () => {
  expect(generateFlightId("")).toBe(undefined);
});

// Test for string of whitespace
// Test whitespace-only string input returns undefined
test("generateFlightId: whitespace string", () => {
  expect(generateFlightId("   \n")).toBe(undefined);
});
// 1.  Test for the first two characters of the ID should be the first two letters of the airline name provided

// Test ID starts with first two letters of Qantas
test("generateFlightId: starts with first two letters of Qantas", () => {
  const id = generateFlightId("Qantas");
  expect(id.startsWith("QA")).toBe(true);
});
//Test ID starts with first two letters of Jetstar
test("generateFlightId: starts with first two letters of Jetstar", () => {
  const id = generateFlightId("Jetstar");
  expect(id.startsWith("JE")).toBe(true);
});
// Test ID starts with first two letters of Virgin
test("generateFlightId: starts with first two letters of Virgin", () => {
  const id = generateFlightId("Virgin");
  expect(id.startsWith("VI")).toBe(true);
});
// 1.1 Test mixed case airline names input returns correct uppercase ID
test("generateFlightId:  mixed-case airline name returns correct uppercase ID", () => {
  const id = generateFlightId("qAnTas");
  expect(id.startsWith("QA")).toBe(true);
});
//1.2  Test all uppercase case airline names returns correct uppercase ID
test("generateFlightId:  all upper-case airline name returns correct uppercase ID", () => {
  const id = generateFlightId("VIRGIN");
  expect(id.startsWith("VI")).toBe(true);
});

// 2. Test first two characters are uppercase for multiple airlines

test("generateFlightId: first two characters are uppercase for every airline", () => {
  const airlines = ["Qantas", "Jetstar", "Virgin"];
  airlines.forEach((airline) => {
    const id = generateFlightId(airline);
    // Extract first two characters from the generated ID
    const firstTwoChars = id.substring(0, 2);
    // Check if first two chars are uppercase
    expect(firstTwoChars).toBe(firstTwoChars.toUpperCase());
  });
});

// 2.1  Test that the first two characters of the generated flight ID are always uppercase,
// regardless of the casing of the input airline name
test("generateFlightId: first two characters are always uppercase", () => {
  const airlines = ["qantas", "jetStar", "VIRGIN", "aIrLiNe"];
  airlines.forEach((airline) => {
    const id = generateFlightId(airline);
    const prefix = id.substring(0, 2);
    expect(prefix).toBe(prefix.toUpperCase());
  });
});

// 2.2 Test: handles lowercase airline names by converting prefix to uppercase
test("generateFlightId: handles lowercase airline names by converting to uppercase", () => {
  const id = generateFlightId("qantas"); // all lowercase input
  expect(id.startsWith("QA")).toBe(true); // should start with uppercase 'QA'
});

// 3.  Test for Providing an airline name that is empty or contains less than two non-whitespace
// characters should result in generateFlightId returning undefined
test("generateFlightId: returns undefined for empty airline name", () => {
  const id = generateFlightId("");
  expect(id).toBeUndefined();
});
//3.1 Test for single character airline name returns undefined
test("generateFlightId: one-letter airline name returns undefined", () => {
  expect(generateFlightId("A")).toBeUndefined();
});
// 3.2 Test for one non-whitespace character with spaces returns undefined
test("generateFlightId: one visible character with spaces returns undefined", () => {
  expect(generateFlightId(" A ")).toBeUndefined();
});
