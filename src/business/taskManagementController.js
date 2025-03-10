/**
 * Processes adding a new task after validating inputs.
 * @param {Object} task - Task details from the UI.
 * @return {Object} Result with success flag and message.
 */
function addTask(task) {
  if (!task.description || !task.assignedTo) {
    return { success: false, message: "Description and assigned user are required." };
  }
  
  try {
    var taskId = addTaskRecord(task);
    return { success: true, message: "Task added with ID: " + taskId };
  } catch (e) {
    return { success: false, message: "Error adding task: " + e.message };
  }
}
