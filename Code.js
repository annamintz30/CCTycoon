/**
 * Adds a custom menu when the spreadsheet is opened.
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Employee Menu')
    .addItem('Add Employee', 'showEmployeeModal')
    .addToUi();
}

/**
 * Opens the modal dialog containing the employee form.
 */
function showEmployeeModal() {
  var html = HtmlService.createHtmlOutputFromFile('EmployeeForm')
    .setWidth(450)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Add Employee');
}

/**
 * Generates a unique JCC ID by scanning existing IDs in column A of the "Employees" sheet.
 * @returns {string} The next unique JCC ID formatted as a 4-digit string.
 */

function generateJccId() {
  var ss = SpreadsheetApp.openById('1EApixFQPbGP5iDqXpxB5Z2hFVpiYl3vfzAAsZwsS_hE');
  var sheet = ss.getSheetByName('Employees');
  var lastRow = sheet.getLastRow();
  
  // If no data exists (only header), start with "1000".
  if (lastRow < 2) {
    return "1000";
  }
  
  // Get all JCC IDs from column A (starting from row 2).
  var idRange = sheet.getRange(2, 1, lastRow - 1, 1);
  var idValues = idRange.getValues();
  var maxId = 0;
  
  // Loop through each ID and find the maximum value.
  for (var i = 0; i < idValues.length; i++) {
    var id = parseInt(idValues[i][0], 10);
    if (!isNaN(id) && id > maxId) {
      maxId = id;
    }
  }
  
  // Increment and format as a 4-digit string.
  return (maxId + 1).toString().padStart(4, '0');
}


/**
 * Adds a new employee record to the "Employees" sheet.
 * The JCC ID is auto-generated.
 * @param {Object} employee - An object containing employee details.
 * Expected properties:
 *   initials: string,
 *   commonName: string,
 *   legalName: string,
 *   jobTitle: string,
 *   hireDate: string (in a valid date format),
 *   schedule: string ("Part-time" or "Full-time"),
 *   status: string ("Onboarding", "Training", "Active", or "Inactive")
 */
function addEmployee(employee) {
  var ss = SpreadsheetApp.openById('1EApixFQPbGP5iDqXpxB5Z2hFVpiYl3vfzAAsZwsS_hE');
  var sheet = ss.getSheetByName('Employees');
  
  // Generate a unique JCC ID.
  var newJccId = generateJccId();
  
  // Append a new row to the sheet with the provided employee data.
  sheet.appendRow([
    newJccId,
    employee.initials,
    employee.commonName,
    employee.legalName,
    employee.jobTitle,
    employee.hireDate,
    employee.schedule,
    employee.status
  ]);
}

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index');
}

//https://script.google.com/macros/s/AKfycbwYbAEmCIrTEo1zazi1-8fJKgrtTpdAUumqQCSLiuTR1PUBbmm1Bsdfwjlw5RZhYPMWfA/exec
