var sequence = 0;

var tasks = [];

draw();

function addTask() {
  var task = {
    description: document.getElementById('task').value,
    isDone: false,
    id: sequence,
  }
  sequence++;
  tasks.push(task);
  draw();
  var user = new Tarefa(task);
  var bd = new Banco();
  bd.inserir(user);
}

class Banco{
  constructor(){
    this.dados;
    if(localStorage.length == 0){
      this.dados = [];
    } else{
      this.dados = JSON.parse(localStorage.getItem('tabela'));
    }
  }
  inserir(tudo) {
    this.dados = JSON.parse(localStorage.getItem('tabela'));
    this.dados = [];
    this.dados.push(tudo);
    localStorage.setItem('tabela', JSON.stringify(this.dados));
  }

  buscar(email, senha){
    this.dados = JSON.parse(localStorage.getItem('tabela'));
    for(var i=0; i < this.dados.length; i++){
      if(this.dados[i].email == email && this.dados[i].senha == senha){
        return this.dados[i];
      }
    }
    return false;
  }
}

class Tarefa{
  constructor(task){
    this.task = task;
  }
}


function draw() {
  document.getElementById('tasks').innerHTML = '';
  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    var taskEl = document.createElement('div');
    taskEl.className = 'task';
    taskEl.id = task.id;
    var taskCheckBox = document.createElement('input');
    taskCheckBox.type = 'checkbox';
    taskCheckBox.id = task.id;
    taskCheckBox.checked = task.isDone;
    var taskLabel = document.createElement('label');
    taskLabel.for = task.id;
    taskLabel.className = 'container';
    var taskDescription = document.createElement('div');
    taskDescription.className = 'taskdescription';
    taskDescription.innerHTML = task.description;
    var taskAction = document.createElement('a');
    taskAction.href = "#";
    taskAction.onclick = removeTask;
    taskAction.id = task.id;
    var taskImg = document.createElement('img');
    taskImg.id = task.id;
    taskImg.src = 'images/trash.png';
    taskImg.alt = 'Remover tarefa';
    taskAction.appendChild(taskImg);
    taskEl.appendChild(taskCheckBox);
    taskEl.appendChild(taskLabel);
    taskEl.appendChild(taskDescription);
    taskEl.appendChild(taskAction);
    document.getElementById('tasks').appendChild(taskEl);
  }
}

function removeTask (event) {
  var taskId = event.target.id;
  var taskIndex = tasks.findIndex(function(task){
    if (task.id == taskId) {
      return true;
    }
    return false;
  });
  tasks.splice(taskIndex, 1);
  draw();
}