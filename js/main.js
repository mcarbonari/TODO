var tasks = [];
var sequence = 0;

function addTask() {
	var task = {
		description: document.getElementById('addtarefa').value,
		id: sequence,
		isDone: false
	}
	sequence++;
	tasks.push(task);
}
