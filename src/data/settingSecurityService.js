/**
 * Opens (or creates) the Settings sheet.
 * @return {GoogleAppsScript.Spreadsheet.Sheet} The Settings sheet.
 */
function getSettingsSheet() {
  var ss = SpreadsheetApp.openById('1EApixFQPbGP5iDqXpxB5Z2hFVpiYl3vfzAAsZwsS_hE');
  var sheet = ss.getSheetByName('Settings');
  if (!sheet) {
    // If the sheet doesn't exist, create it and add a header row.
    sheet = ss.insertSheet('Settings');
    sheet.appendRow(['UserEmail', 'Theme', 'SecuritySettings']);
  }
  return sheet;
}

/**
 * Retrieves settings for a given user email.
 * @param {string} email - The user's email.
 * @return {Object|null} The settings object or null if not found.
 */
function getUserSettings(email) {
  var sheet = getSettingsSheet();
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) { // skip header row
    if (data[i][0] === email) {
      return {
        email: data[i][0],
        theme: data[i][1],
        securitySettings: data[i][2]
      };
    }
  }
  return null;
}

/**
 * Saves or updates the user settings.
 * @param {Object} settings - An object with properties: email, theme, securitySettings.
 */
function saveUserSettings(settings) {
  var sheet = getSettingsSheet();
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === settings.email) {
      // Update existing settings
      sheet.getRange(i + 1, 2, 1, 2).setValues([[settings.theme, settings.securitySettings]]);
      return;
    }
  }
  // If not found, append a new row
  sheet.appendRow([settings.email, settings.theme, settings.securitySettings]);
}
