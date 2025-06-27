import readlineSync from "readline-sync";
import {
  generateFlightId,
  isValidDateString,
  logSeparated,
  logWrapped,
  wrapString,
} from "./utilities.js";
import {
  createFlightEntry,
  printScheduleTable,
} from "./flightScheduleDisplay.js";
//Set the line length for visual formatting of console output
const lineLength = 94;
//Define main menu options for the user to select from
const mainMenuOptions = [
  "View current flight schedule",
  "Log flight change",
  "EXIT",
];
//Define sub-menu options for flight schedule changes
const scheduleChangeMenuOptions = [
  "Change existing flight date",
  "Add new flight",
];
//Initial list of airlines
let airlines = ["Qantas", "Jetstar", "Virgin"];
//Initial list of flights being tracked
let flights = [
  {
    id: "QA187",
    airline: "Qantas",
    origin: "Sydney",
    destination: "Perth",
    date: "15/05/2024",
  },
  {
    id: "JE095",
    airline: "Jetstar",
    origin: "Gold Coast",
    destination: "Alice Springs",
    date: "07/06/2024",
  },
  {
    id: "VI783",
    airline: "Virgin",
    origin: "Bangkok",
    destination: "London",
    date: "16/08/2024",
  },
];
//This will store the user’s selected menu option
let input = "";
//Main loop that runs until the user chooses "EXIT"
do {
  //Clear the console for a clean display
  console.clear();
  //Display menu header
  logSeparated("MENU", lineLength);
  // Show main menu and get user’s selection
  input = readlineSync.keyInSelect(
    mainMenuOptions,
    "Please select an action to continue",
    { cancel: false }
  );

  switch (input) {
    case 0: {
      //Case 0: User chose "View current flight schedule"
      console.clear();
      logSeparated("Current Schedule", lineLength);
      printScheduleTable(flights); //Print the list of all current flight
      readlineSync.keyInPause(wrapString("Press q to return to main menu..."), {
        limit: ["q"],
        guide: false,
      });
      console.clear();
      break;
    }
    case 1: {
      // Case 1: User chose "Log flight change"
      console.clear();
      logSeparated("Update Schedule", lineLength); // Display update section header
      const choice = readlineSync.keyInSelect(
        scheduleChangeMenuOptions,
        "Please select an action to continue"
      );
      // Ask the user whether they want to change a date or add a new flight);
      console.clear();

      // Handle the user's choice between updating or adding a flight
      switch (choice) {
        case 0: {
          //User chose "Change existing flight date"
          logSeparated("Change Flight Date", lineLength);
          let flightId = "";
          let flightIndex = -1;
          // flightId = flightId;
          do {
            // Loop until a valid flight ID is entered
            flightId = readlineSync.question(
              wrapString("Enter the id of the flight to change the date for: ")
            );
            // Loop through flights to find one with a matching ID
            for (let i = 0; i < flights.length; i++) {
              if (flights[i].id.toLowerCase() === flightId.toLowerCase()) {
                flightIndex = i; //Save the index of the matched flight
                break;
              }
            } //If flight not found, show an error
            if (flightIndex < 0) {
              logWrapped(
                `ERROR: Flight ID ${flightId} not found. Please enter the ID of a flight already tracked by this system.`
              );
            }
          } while (flightIndex < 0); //Repeat until valid ID is entered

          // Display current departure date of the selected flight
          logWrapped(
            `The current departure date for ${flights[flightIndex].id} is ${flights[flightIndex].date}`
          );
          // Prompt user to enter new flight date and update the flight object
          const newDate = enterFlightDate();
          flights[flightIndex].date = newDate;

          logWrapped(`Flight successfully updated!`);
          readlineSync.keyInPause(
            wrapString("Press q to return to main menu..."),
            { limit: ["q"], guide: false }
          );
          break;
        }
        case 1: {
          // Add new flight
          console.clear();
          logSeparated("Add New Flight", lineLength);

          let airlineIndex = 0;
          let cachedLength = 0;
          do {
            airlineIndex = readlineSync.keyInSelect(
              [...airlines, "Add New Airline"],
              "Select an existing airline or add a new one ",
              { cancel: false }
            );
            cachedLength = airlines.length;
            // If user selects "Add New Airline" option
            if (airlineIndex === airlines.length) {
              let isValid = false;
              const oldLength = airlines.length;
              while (!isValid) {
                const newAirline = readlineSync.question(
                  wrapString("Enter the name of the airline to add: ")
                );

                airlines = addAirline(newAirline, airlines);
                isValid = airlines.length > oldLength;
              }
            }
          } while (airlineIndex === cachedLength);
          //Get flight details from user
          const origin = readlineSync.question(
            wrapString("Enter the location the flight will depart from: ")
          );
          const destination = readlineSync.question(
            wrapString("Enter the destination of the flight: ")
          );

          const date = enterFlightDate();

          const flight = {
            // Create new flight object
            id: generateFlightId(airlines[airlineIndex]),
            airline: airlines[airlineIndex],
            origin,
            destination,
            date,
          }; //Add new flight to flights array
          flights.push(flight);

          logWrapped(
            `Successfully added flight ${flight.id} with the following details:`
          );
          console.log(createFlightEntry(flight));
          readlineSync.keyInPause(
            wrapString("Press q to return to main menu..."),
            { limit: ["q"], guide: false }
          );
          break;
        }
        case 2:
          break;
      }
      break;
    }
    case 2:
      break;
  }
} while (input !== 2);

console.clear();
logWrapped("EXITING...", lineLength);

// Function to prompt user to enter a flight date in DD/MM/YYYY format and validate it
function enterFlightDate() {
  let date = "";
  let isValid = false;
  do {
    date = readlineSync.question(
      wrapString(
        "Enter the departure date of this flight using the format DD/MM/YYYY: "
      )
    );
    isValid = isValidDateString(date);
    if (!isValid) {
      logWrapped(
        "ERROR: The provided date does not use the correct format or is not a real date, please re-enter the date."
      );
    }
  } while (!isValid);

  return date;
}

/**
 * Returns true and adds the specified airline to the list of airlines if it is not a blank/empty string or the name of an existing airline. Returns false otherwise.
 *
 * @param {string} airline the name of the airline to add
 * @param {string[]} airlines the list of existing airlines to add to
 * @returns the list of airlines, modified if the new airline could be successfully added
 */
function addAirline(airline, airlines) {
  if (airline.trim() === "") {
    logWrapped("ERROR: Airline name cannot be blank.");
    return airlines;
  }

  // Check if the airline already exists (case-insensitive)
  const exists = airlines.some(
    (a) => a.toLowerCase() === airline.toLowerCase()
  );

  if (exists) {
    logWrapped("ERROR: Airline already exists.");
    return airlines;
  }

  airlines.push(airline);
  logWrapped(`Airline ${airline} successfully added.`); //Add new airline and confirm success
  return airlines;
  // console.log("bad code");
}
