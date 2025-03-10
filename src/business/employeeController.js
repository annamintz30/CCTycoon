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
    var jccId = addEmployeeRecord(employee);
    return { success: true, message: "Employee added with JCC ID " + jccId };
  } catch (e) {
    return { success: false, message: "Error adding employee: " + e.message };
  }
}

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('ui/EmployeeDatabase')
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
  const employees = getEmployeesFromSheet();
  return employees;
}
