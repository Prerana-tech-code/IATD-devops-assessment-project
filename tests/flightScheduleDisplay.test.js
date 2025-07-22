// Import the functions to be tested from the flightScheduleDisplay module
import {
  createFlightEntry,
  createTableHeader,
} from "../src/flightScheduleDisplay";

// Test to check if createTableHeader returns the expected formatted table header string
test("createTableHeader: create table header", () => {
  const expectedResult = `| Flight ID | Airline         | Origin               | Destination          | Date           |
==============================================================================================`;
  expect(createTableHeader()).toBe(expectedResult);
});
// Test to check if createFlightEntry correctly formats a single-line flight entry string
test("createFlightEntry: create single-line flight entry", () => {
  const expectedResult = `| QU187     | Quantas         | Sydney               | Perth                | 15/05/2024     |
-----------------------------------------------------------------------------------------------`;
  expect(
    createFlightEntry({
      id: "QU187",
      airline: "Quantas",
      origin: "Sydney",
      destination: "Perth",
      date: "15/05/2024",
    })
  ).toBe(expectedResult);
});
// Test createFlightEntry with an airline name that wraps over multiple lines

test("createFlightEntry: create flight entry with multi-line airline name", () => {
  const expectedResult = `| QU876     | Quantas is      | Sydney               | Perth                | 15/05/2024     |
|           | gonna fly you   |                      |                      |                |
|           | to the ends of  |                      |                      |                |
|           | the earth and   |                      |                      |                |
|           | back            |                      |                      |                |
-----------------------------------------------------------------------------------------------`;
  expect(
    createFlightEntry({
      id: "QU876",
      airline: "Quantas is gonna fly you to the ends of the earth and back",
      origin: "Sydney",
      destination: "Perth",
      date: "15/05/2024",
    })
  ).toBe(expectedResult);
});
// Test createFlightEntry with an origin string that wraps over multiple lines
test("createFlightEntry: create flight entry with multi-line origin", () => {
  const expectedResult = `| QU537     | Quantas         | This is a location   | Perth                | 15/05/2024     |
|           |                 | that causes          |                      |                |
|           |                 | nightmares for text  |                      |                |
|           |                 | wrapping all around  |                      |                |
|           |                 | the world            |                      |                |
-----------------------------------------------------------------------------------------------`;
  expect(
    createFlightEntry({
      id: "QU537",
      airline: "Quantas",
      origin:
        "This is a location that causes nightmares for text wrapping all around the world",
      destination: "Perth",
      date: "15/05/2024",
    })
  ).toBe(expectedResult);
});

// Test createFlightEntry with a destination string that wraps over multiple lines
test("createFlightEntry: create flight entry with multi-line destination", () => {
  const expectedResult = `| QU170     | Quantas         | Sydney               | This is a location   | 15/05/2024     |
|           |                 |                      | that causes          |                |
|           |                 |                      | nightmares for text  |                |
|           |                 |                      | wrapping all around  |                |
|           |                 |                      | the world            |                |
-----------------------------------------------------------------------------------------------`;
  expect(
    createFlightEntry({
      id: "QU170",
      airline: "Quantas",
      origin: "Sydney",
      destination:
        "This is a location that causes nightmares for text wrapping all around the world",
      date: "15/05/2024",
    })
  ).toBe(expectedResult);
});
//Test createFlightEntry with multi-line airline name, origin, and destination all together
test("createFlightEntry: create flight entry with everything multi-line", () => {
  const expectedResult = `| QU387     | Quantas is      | This is a location   | This is a location   | 15/05/2024     |
|           | gonna fly you   | that causes          | that causes          |                |
|           | to the ends of  | nightmares for text  | nightmares for text  |                |
|           | the earth and   | wrapping all around  | wrapping all around  |                |
|           | back            | the world            | the world            |                |
-----------------------------------------------------------------------------------------------`;
  expect(
    createFlightEntry({
      id: "QU387",
      airline: "Quantas is gonna fly you to the ends of the earth and back",
      origin:
        "This is a location that causes nightmares for text wrapping all around the world",
      destination:
        "This is a location that causes nightmares for text wrapping all around the world",
      date: "15/05/2024",
    })
  ).toBe(expectedResult);
});
