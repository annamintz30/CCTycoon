/**
 * Gets or creates the Meetings sheet.
 * @return {GoogleAppsScript.Spreadsheet.Sheet} The Meetings sheet.
 */
function getMeetingSheet() {
  var ss = SpreadsheetApp.openById('1EApixFQPbGP5iDqXpxB5Z2hFVpiYl3vfzAAsZwsS_hE');
  var sheet = ss.getSheetByName('Meetings');
  if (!sheet) {
    sheet = ss.insertSheet('Meetings');
    sheet.appendRow(['MeetingID', 'Title', 'Date', 'Participants', 'Notes']);
  }
  return sheet;
}

/**
 * Adds a new meeting record.
 * @param {Object} meeting - Meeting details.
 * @return {string} New Meeting ID.
 */
function addMeetingRecord(meeting) {
  var sheet = getMeetingSheet();
  var newMeetingId = "M" + (sheet.getLastRow());
  var row = [newMeetingId, meeting.title, meeting.date, meeting.participants, meeting.notes];
  sheet.appendRow(row);
  return newMeetingId;
}
