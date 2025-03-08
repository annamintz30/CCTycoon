/**
 * Adds or updates an SOP.
 * @param {Object} sop - SOP details from the UI.
 * @return {Object} Result object with success status and message.
 */
function saveSOP(sop) {
  if (!sop.title || !sop.content) {
    return { success: false, message: "Title and content are required." };
  }
  try {
    var sopId = saveSOPRecord(sop);
    return { success: true, message: "SOP saved with ID: " + sopId };
  } catch (e) {
    return { success: false, message: "Error saving SOP: " + e.message };
  }
}
