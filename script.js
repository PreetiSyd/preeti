class Task {
  constructor(ID, name, desc, date, assignedTo, status) {
    this.ID = ID;
    this.TaskName = name;
    this.TaskDesc = desc;
    this.DueDate = date;
    this.AssignedTo = assignedTo;
    this.Status = status;
  }
  toHTMLElement() {
    const htmlStr = this.toHTMLString();
    const element = document.createRange().createContextualFragment(htmlStr);
    element
      .querySelector("button.edit")
      .addEventListener("click", editTaskClicked);
    element
      .querySelector("button.delete")
      .addEventListener("click", deleteTaskClicked);

    return element;
  }
  toHTMLString() {
    const htmlString = `
    <div class="card border-info mt-2">
        <div id ="${this.ID}" class="card">
            <div class="card-header">
                <div class="row">
                    <div class="col-md-8">
                        <h5 class="card-title">${this.TaskName}</h5>
                    </div>
                    <div class="col-md-4">
                        <h5 class="dueDateLabel">Due Date: ${this.DueDate}</h5>                        
                    </div>
                </div>
            </div>
                <div class="card-body">
                  <label for="forTaskDescription">
                      <dt>Description</dt>
                  </label>
                <div class="overflow-auto border">
                    <p class="card-text">${this.TaskDesc}</p>
                </div>
                <div class="row mt-5">
                    <div class="col-md-6 border">
                        <label for="forAssignedTo">
                            <dt>Assigned To</dt>
                        </label>
                        <p>${this.AssignedTo}</p>
                    </div>
                    <div class="col-md-6 border">
                        <label for="selectStatus">
                            <dt>Status</dt>
                        </label>
                        <p>${this.Status}</p>
                    </div>
                </div>
              </div>
              <div class="card-footer">
                  <button class="edit btn-primary btn-lg float-right ml-2">Update</i></button>
                  <button class="delete btn-danger btn-lg float-right">Delete</i></button>                
              </div>
          </div>
    </div>`;
    return htmlString;
  }
}

class TaskManager {
  constructor(taskContainer) {
      this.ID = 1;
      this.tasks = [];
      this.taskContainer = taskContainer;
  }
  addTask(name, desc, duedate, assignto, status) {
      const addNewTask = new Task(this.ID++, name, desc, duedate, assignto, status);
      this.tasks.push(addNewTask);
      this.display();
  }
  display() {
      this.taskContainer.innerHTML = "";
      this.tasks.forEach((t) => {
          this.taskContainer.append(t.toHTMLElement());
      });
  }
  deleteTask(id) {
      this.tasks = this.tasks.filter((h) => h.ID != id);
      this.display();
  }
  editTask(taskId, name, desc, duedate, assignedTo, status) {
      for (var i = 0; i < this.tasks.length; i++) {
          if (this.tasks[i].ID == taskId) {
              this.tasks[i].TaskName = name;
              this.tasks[i].TaskDesc = desc;
              this.tasks[i].DueDate = duedate;
              this.tasks[i].AssignedTo = assignedTo;
              this.tasks[i].Status = status;
              break;
          }
      }
      this.display();
  }
}

// Code to access the DOM elements to append Task Card
const taskContainer = document.querySelector("#taskContainer");
// Creating taskAdmin Object
var taskAdmin = new TaskManager(taskContainer);

// Add task button click event listener -> the label for the model has to change it to 'Add Task'
document.querySelector('#btnAddTask').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById("taskModalLabel").innerHTML = "Add Task"
  console.log(document.getElementById("taskModalLabel").innerHTML);
});

//---------Code for Task-6----------------------------------------
document.querySelector('#formAddTask').addEventListener('submit', (e) => {
  e.preventDefault();
  taskFormSubmitClick();
  clearModalFormValues();
  $('#taskModal').modal('hide');
});

function taskFormSubmitClick() {
//--------When 'Submit' is clicked --> all the values are displayed on the Task Card
  var cardID = document.getElementById('task-id').value; 
  var taskName = document.getElementById('txtTaskName').value;
  var taskDesc = document.getElementById('txtTaskDec').value;
  var taskAssignedTo = document.getElementById('txtTaskAssigned').value;
  var taskStatus = document.getElementById('selectStatus').value;
  var dueDate = document.getElementById('duedate').value;

  if (cardID != "") {
//The 'editTask' Function picks-up the value of the Task-id from the Task Card for the card for which update-task has been selected
      taskAdmin.editTask(cardID, taskName, taskDesc, dueDate, taskAssignedTo, taskStatus);
  }
  else {
// when adding a new task, 'task-id' input element in the html will be blank
      taskAdmin.addTask(taskName, taskDesc, dueDate, taskAssignedTo, taskStatus);
  }
}

function clearModalFormValues() {
  document.getElementById('task-id').value = ""; // Make hidden element task-id to blank aswewll.
  document.getElementById('txtTaskName').value = "";
  document.getElementById('txtTaskDec').value = "";
  document.getElementById('txtTaskAssigned').value = "";
  document.getElementById('selectStatus').value = "";
  document.getElementById('duedate').value = "";
}
//-------------------------End of Code for Task-6------------------------------------


//-----------------------Start of Code for Task-7------------------------------------
// When 'delete' button is clicked --> it picks-up the Task-id for the Task for which the button is clicked
function deleteTaskClicked(event) {
  const taskElement = event.target.closest('.card');
  taskAdmin.deleteTask(taskElement.attributes.id.value);
}
//--------------------End of Code for Task-7---------------------------------------

//--------------------Start of Code for Task-8---------------------------------------
function editTaskClicked() {
// Retrieving the Html element where class name is declared as 'card'
  const taskElement = event.target.closest('.card');  
  const cardID = taskElement.attributes.id.value;     

  const updateTaskRecord = taskAdmin.tasks.find((tc) => cardID == tc.ID); // Retreving the task object from the tasks array using inbuilt 'find' function for the array.
// Assign Card ID value to the hidden input html element, So when 'submit' button is clicked it knows what to perform (Add or Edit)
  document.getElementById('task-id').value = cardID;
  document.getElementById('txtTaskName').value = updateTaskRecord.TaskName;
  document.getElementById('txtTaskDec').value = updateTaskRecord.TaskDesc;
  document.getElementById('txtTaskAssigned').value = updateTaskRecord.AssignedTo;
  document.getElementById('selectStatus').value = updateTaskRecord.Status;
  document.getElementById('duedate').value = updateTaskRecord.DueDate;

  document.getElementById("taskModalLabel").innerHTML = "Update Task"
  $('#taskModal').modal('show');
}

//-----------------------------Code for Task 9 -------------------------------------------------------
document.addEventListener('DomContentLoaded', function () {
function storeTasks(Task) {
  let myTasks = JSON.stringify(taskAdmin.tasks);
  let myJSON = JSON.stringify(tasks);
  console.log(myJSON);
  localStorage.setItem('myCat', 'Tom');
// document.getElementById("demo").innerHTML = myJSON;
  // console.log(tasks);

  // window.localStorage.setItem('tasks')
  window.localStorage.setItem('tasks');
  console.log(localStorage);
}
});
//-------------------------------End of Code for Task 9-----------------------------------------------