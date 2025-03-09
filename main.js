function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('ui/EmployeeForm')
      .setTitle("Employee Database Dashboard");
}

function doPost(e) {
  try {
    // Parse the incoming request
    var request = JSON.parse(e.postData.contents);
    
    // Route based on the action (e.g., "addEmployee")
    if (request.action === "addEmployee") {
      var result = addEmployee(request.employee); // Call your business logic function
      return ContentService
        .createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Default response if action is not recognized
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
