// src/business/employeeController.gs
  // addEmployee()

/**
 * Adds a new employee after performing validations.
 * @param {Object} employee - Employee data from the UI.
 * @return {Object} Result with success status and message.
 */
function addEmployee(employee) {
  // Validate input (e.g., required fields, unique initials, etc.)
  if (!employee.legalName) {
    return { success: false, message: "Legal name is required." };
  }
  // Add more validations as needed...
  
  // Use the data layer to add the employee record.
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Employees");
    sheet.appendRow([
      employee.initials, employee.commonName, employee.legalName, employee.jobTitle, 
      employee.hireDate, employee.schedule, employee.status, employee.password, employee.theme
    ]);
    
    return "Employee added successfully"; // Ensure a response is returned
  } catch (error) {
    return `Error: ${error.message}`;
  }
}

function doGet(e) {
    if (e.parameter.page === "EmployeeForm") {
        return HtmlService.createHtmlOutputFromFile("ui/EmployeeForm")
            .setTitle("Add New Employee");
    }
    return HtmlService.createHtmlOutputFromFile("ui/EmployeeDatabase")
        .setTitle("Employee Database");
}


function doPost(e) {
  try {
    var request = JSON.parse(e.postData.contents);

    if (request.action === "addEmployee") {
      var result = addEmployee(request.employee);
      return ContentService
        .createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: "Unknown action" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Error in doPost: " + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getEmployeeList() {
  Logger.log("getEmployeeList() called.");
  let employees = getEmployeesFromSheet();
  
  Logger.log("Employees Retrieved: " + JSON.stringify(employees));

  // Return as JSON String
  return JSON.stringify(employees); 
}

function getEmployeeFormUrl() {
    return ScriptApp.getService().getUrl() + "?page=EmployeeForm";
}


