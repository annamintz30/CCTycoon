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
