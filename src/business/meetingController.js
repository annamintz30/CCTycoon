/**
 * Adds a meeting after validation.
 * @param {Object} meeting - Meeting details from the UI.
 * @return {Object} Result with success flag and message.
 */
function addMeeting(meeting) {
  if (!meeting.title || !meeting.date) {
    return { success: false, message: "Meeting title and date are required." };
  }
  try {
    var meetingId = addMeetingRecord(meeting);
    return { success: true, message: "Meeting added with ID: " + meetingId };
  } catch (e) {
    return { success: false, message: "Error adding meeting: " + e.message };
  }
}
