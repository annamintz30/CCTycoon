// src/data/employeeService.gs 
  // getEmployeeSheet()
  // generateJccId()
  // addEmployeeRecord()

/**
 * Opens the Employee Google Sheet.
 * @return {GoogleAppsScript.Spreadsheet.Sheet} The Employees sheet.
 */
function getEmployeeSheet() {
  var ss = SpreadsheetApp.openById('1EApixFQPbGP5iDqXpxB5Z2hFVpiYl3vfzAAsZwsS_hE');
  return ss.getSheetByName('Employees');
}

/**
 * Generates a unique JCC ID.
 * @return {string} The new JCC ID starting at 1000.
 */
function generateJccId() {
  var sheet = getEmployeeSheet();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return "1000";
  }
  
  var idRange = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  var maxId = 0;
  for (var i = 0; i < idRange.length; i++) {
    var id = parseInt(idRange[i][0], 10);
    if (!isNaN(id) && id > maxId) {
      maxId = id;
    }
  }
  return (maxId + 1).toString();
}

/**
 * Adds a new employee record to the sheet.
 * @param {Object} employee - Object containing employee data.
 */
function addEmployeeRecord(employee) {
  var sheet = getEmployeeSheet();
  var newJccId = generateJccId();
  // Construct a row array from employee object properties
  var row = [
    newJccId,
    employee.initials,
    employee.commonName,
    employee.legalName,
    employee.jobTitle,
    employee.hireDate,
    employee.schedule,
    employee.status,
    employee.password,   // Note: In the future, consider storing a hashed password
    employee.theme
  ];
  sheet.appendRow(row);
  return newJccId;
}

function getEmployeesFromSheet() {
  const sheet = SpreadsheetApp.openById("1EApixFQPbGP5iDqXpxB5Z2hFVpiYl3vfzAAsZwsS_hE").getSheetByName("Employees");
  const data = sheet.getDataRange().getValues();
  
  const headers = data[0]; // First row is headers
  const employees = data.slice(1).map(row => {
    let employeeObj = {};
    headers.forEach((header, index) => {
      employeeObj[header] = row[index]; // Map values to headers
    });
    return employeeObj;
  });
    
  return employees;
}
