/**
 * Retrieves the Task Management sheet.
 * Creates one if it does not exist.
 * @return {GoogleAppsScript.Spreadsheet.Sheet}
 */
function getTaskSheet() {
  var ss = SpreadsheetApp.openById('1EApixFQPbGP5iDqXpxB5Z2hFVpiYl3vfzAAsZwsS_hE');
  var sheet = ss.getSheetByName('Tasks');
  if (!sheet) {
    sheet = ss.insertSheet('Tasks');
    sheet.appendRow(['TaskID', 'Description', 'AssignedTo', 'DueDate', 'Status']);
  }
  return sheet;
}

/**
 * Adds a new task record to the Tasks sheet.
 * @param {Object} task - Object with task details.
 * @return {string} New Task ID.
 */
function addTaskRecord(task) {
  var sheet = getTaskSheet();
  // Generate a new Task ID, e.g., using sheet.getLastRow() or a custom function
  var newTaskId = "T" + (sheet.getLastRow());
  var row = [newTaskId, task.description, task.assignedTo, task.dueDate, task.status];
  sheet.appendRow(row);
  return newTaskId;
}
