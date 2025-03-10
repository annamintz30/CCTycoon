// src/data/employeeService.gs 
  // getEmployeeSheet()
  // generateJccId()
  // addEmployeeRecord()

const EMPLOYEE_SHEET_ID = '1EApixFQPbGP5iDqXpxB5Z2hFVpiYl3vfzAAsZwsS_hE'; // Your Google Sheet ID
const EMPLOYEE_SHEET_NAME = 'Employees'; // Sheet tab name

/**
 * Gets all employee records from the Google Sheet.
 * @returns {Array} Array of employee objects.
 */
function getEmployees() {
  const sheet = getEmployeeSheet();
  const data = sheet.getDataRange().getValues();
  
  // Extract headers
  const headers = data[0]; 
  const employees = [];

  for (let i = 1; i < data.length; i++) {
    let row = data[i];
    let employee = {};

    headers.forEach((header, index) => {
      employee[header] = row[index];
    });

    employees.push(employee);
  }

  return employees;
}

/**
 * Gets employees filtered by search query and active/inactive status.
 * @param {string} searchQuery - The search query for filtering names.
 * @param {boolean} showInactive - Whether to show inactive employees.
 * @returns {Array} Filtered employee objects.
 */
function getFilteredEmployees(searchQuery, showInactive) {
  const allEmployees = getEmployees();
  
  return allEmployees.filter(emp => {
    const matchesSearch = searchQuery
      ? emp.CommonName.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    const matchesStatus = showInactive ? true : emp.Status !== 'Inactive';

    return matchesSearch && matchesStatus;
  });
}

/**
 * Updates an existing employee in the Google Sheet.
 * @param {Object} employee - Employee object containing updated fields.
 */
function updateEmployee(employee) {
  const sheet = getEmployeeSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  const idIndex = headers.indexOf('JCC ID');
  if (idIndex === -1) return;

  for (let i = 1; i < data.length; i++) {
    if (data[i][idIndex] == employee.id) {
      headers.forEach((header, index) => {
        if (employee[header] !== undefined) {
          sheet.getRange(i + 1, index + 1).setValue(employee[header]);
        }
      });
      return;
    }
  }
}

/**
 * Deletes an employee from the Google Sheet.
 * @param {string} id - The JCC ID of the employee to delete.
 */
function deleteEmployee(id) {
  const sheet = getEmployeeSheet();
  const data = sheet.getDataRange().getValues();
  const idIndex = data[0].indexOf('JCC ID');

  if (idIndex === -1) return;

  for (let i = 1; i < data.length; i++) {
    if (data[i][idIndex] == id) {
      sheet.deleteRow(i + 1);
      return;
    }
  }
}

/**
 * Gets the Google Sheet object for the Employee database.
 * @returns {GoogleAppsScript.Spreadsheet.Sheet} The employee sheet.
 */
function getEmployeeSheet() {
  const ss = SpreadsheetApp.openById(EMPLOYEE_SHEET_ID);
  return ss.getSheetByName(EMPLOYEE_SHEET_NAME);
}


//=============================

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
