/**
 * Retrieves or creates the Training sheet.
 * @return {GoogleAppsScript.Spreadsheet.Sheet} The Training sheet.
 */
function getTrainingSheet() {
  var ss = SpreadsheetApp.openById('1EApixFQPbGP5iDqXpxB5Z2hFVpiYl3vfzAAsZwsS_hE');
  var sheet = ss.getSheetByName('Training');
  if (!sheet) {
    sheet = ss.insertSheet('Training');
    sheet.appendRow(['TrainingID', 'EmployeeID', 'Module', 'Progress', 'LastUpdated']);
  }
  return sheet;
}

/**
 * Saves a training record.
 * @param {Object} training - Training details.
 * @return {string} The Training ID.
 */
function saveTrainingRecord(training) {
  var sheet = getTrainingSheet();
  var newId = "TR" + (sheet.getLastRow());
  sheet.appendRow([newId, training.employeeId, training.module, training.progress, new Date()]);
  return newId;
}
