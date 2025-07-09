// Import the wrapString function from a utility module
// This function will be used to wrap long text within column width

import { wrapString } from "./utilities.js";
// Column widths for each field in the table
const columnDimensions = [9, 15, 20, 20, 14];
// Column headings to be displayed in the table header
const columnHeadings = [
  "Flight ID",
  "Airline",
  "Origin",
  "Destination",
  "Date",
];

/**
 * Returns a formatted string containing the table header for displaying the current inventory.
 */
export function createTableHeader() {
  let header = "|";
  // Loop through each column to build the header with proper spacing
  for (let i = 0; i < columnHeadings.length; i++) {
    // Add padding spaces to align with column width
    header = header.concat(" ", columnHeadings[i]);

    const diff = columnDimensions[i] - columnHeadings[i].length;
    if (diff > 0) {
      header = header.concat(" ".repeat(diff), " |");
    } else {
      header = header.concat(" |");
    }
  }
  // Add a divider line under the header
  header = header.concat("\n", "=".repeat(header.length));

  return header;
}

/**
 * Returns a string that should occupy the specified line in the specified column using the content provided.
 *
 * @param {number} columnIndex the index of the column the line is being created in
 * @param {number} lineIndex the index of the line being created within the row
 * @param {string[]} columnContent the content to populate the column
 * @returns a string that should occupy the specified line in the specified column using the content provided
 */
export function createLineInColumn(columnIndex, lineIndex, columnContent) {
  if (columnContent.length > lineIndex) {
    // Add padding to align with column width
    return columnContent[lineIndex].concat(
      " ".repeat(
        columnDimensions[columnIndex] - columnContent[lineIndex].length
      ),
      " | "
    );
  } else {
    // Empty line if no content available at this index
    return " ".repeat(columnDimensions[columnIndex]).concat(" | ");
  }
}

/**
 * Returns a formatted string containing the information for the provided item.
 *
 * @param {{id: string, airline: string, origin: string, destination: string, date: string}} flight the item to create an entry for
 */
export function createFlightEntry(flight) {
  // Wrap each field and split into lines
  const id = wrapString(flight.id, columnDimensions[0]).split("\n");
  const airline = wrapString(flight.airline, columnDimensions[1]).split("\n");
  const origin = wrapString(flight.origin, columnDimensions[2]).split("\n");
  const destination = wrapString(flight.destination, columnDimensions[3]).split(
    "\n"
  );
  const date = wrapString(flight.date, columnDimensions[4]).split("\n");
  // Determine how many lines are needed to fully display the wrapped content
  const maxRows = Math.max(
    id.length,
    airline.length,
    origin.length,
    destination.length,
    date.length
  );

  let lines = [""];
  // Construct each line of the table entry row
  for (let i = 0; i < maxRows; i++) {
    lines[i] = "| ";
    lines[i] = lines[i].concat(createLineInColumn(0, i, id));
    lines[i] = lines[i].concat(createLineInColumn(1, i, airline));
    lines[i] = lines[i].concat(createLineInColumn(2, i, origin));
    lines[i] = lines[i].concat(createLineInColumn(3, i, destination));
    lines[i] = lines[i].concat(createLineInColumn(4, i, date));
  }
  // Join all lines into a single string, trimming extra space and adding a bottom border
  return lines
    .map((l) => l.trim())
    .join("\n")
    .concat("\n", "-".repeat(lines[0].length));
}

/**
 * Prints a table displaying the current content of the inventory.
 *
 * @param {{id: string, airline: string, origin: string, destination: string, date: string}} flights the items in inventory
 */
export function printScheduleTable(flights) {
  console.log(createTableHeader()); // Print header first
  flights.forEach((flight) => {
    console.log(createFlightEntry(flight)); // Print each flight's formatted row
  });
}
