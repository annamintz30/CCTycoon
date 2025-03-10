/**
 * Retrieves or creates the SOP sheet.
 * @return {GoogleAppsScript.Spreadsheet.Sheet} The SOP sheet.
 */
function getSOPSheet() {
  var ss = SpreadsheetApp.openById('1EApixFQPbGP5iDqXpxB5Z2hFVpiYl3vfzAAsZwsS_hE');
  var sheet = ss.getSheetByName('SOPs');
  if (!sheet) {
    sheet = ss.insertSheet('SOPs');
    sheet.appendRow(['SOPID', 'Title', 'Content', 'LastUpdated']);
  }
  return sheet;
}

/**
 * Saves a new or updated SOP.
 * @param {Object} sop - SOP details.
 * @return {string} The SOP ID.
 */
function saveSOPRecord(sop) {
  var sheet = getSOPSheet();
  // Simple logic: if SOPID exists, update; otherwise, append
  // This is a placeholder; a more robust logic might be needed.
  if (sop.id) {
    // Update logic (not fully implemented here)
    return sop.id;
  } else {
    var newId = "SOP" + (sheet.getLastRow());
    sheet.appendRow([newId, sop.title, sop.content, new Date()]);
    return newId;
  }
}
