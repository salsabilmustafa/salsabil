const showHidebtn = document.querySelector('#showHidebtn button')
const addEditbtn = document.querySelector('#add-edit-btn button')
const myForm = document.querySelector('#myForm')
const formData = document.querySelector('#myForm form')
const mainDataHeads = ['taskTitle', 'taskContent', 'taskType']
const tasksWrap = document.querySelector('#content-wrapper .row ')
let isEditMode=false;
let originalTask={}

let tasks = []
const getTasks = () =>{
    tasks = localStorage.getItem('tasks') || '[]'
    return JSON.parse(tasks)
}
const setTasks = (tasks) =>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

showHideEvent = function(e){
    myForm.classList.toggle('d-none')
    if(e.target) this.innerText === "show form"?  this.innerText = "hide form" : this.innerText = "show form"
    else{ e.innerText="show form" }
}

addEditEvent = function(e){
    if(e.target) this.innerText === "Add Task"?  this.innerText = "Edit Task" : this.innerText = "Add Task"
    else{ e.innerText="Add Task" }
}

addTask = function(e){
    e.preventDefault()
    task = { status:false, id : new Date().getTime()}
    mainDataHeads.forEach( head => task[head] = this.elements[head].value );
    tasks = getTasks()
    if(isEditMode){
        mainDataHeads.forEach( head => task[head] = this.elements[head].value );
        const index=tasks.findIndex(t=> t.id == originalTask.id)
        task={...task,id:originalTask.id}
        tasks[index]=task
    }
    else{
        tasks.push(task);
    }
    setTasks(tasks)
    reset();
    showTasks();
}

let createNewElement = (elementTag, elementTxt, elementClasses,parent, attributes) =>{
    myNewEl = document.createElement(elementTag)
    if(elementTxt!='') myNewEl.innerText = elementTxt
    if(elementClasses!="") myNewEl.className =elementClasses
    parent.appendChild(myNewEl)  
    attributes.forEach(attr=>{
            myNewEl.setAttribute(attr.attrName, attr.attrVal)
        })
        return myNewEl  
}

deleteTask =function(task){
    i = tasks.findIndex(t=> t.id == task.id)
    tasks.splice(i,1)
    setTasks(tasks)
    showTasks()
}

editTask=function(task){
    showHideEvent(showHidebtn);
    addEditbtn.innerText=' Edit Task';
    setFormDate(task);
    originalTask=task
    isEditMode=true;
}

function showTasks (){
    tasks = getTasks()
    tasksWrap.innerText=""
    if(tasks.length==0) createNewElement('div', 'No Tasks To Show', 'alert alert-danger', tasksWrap, [])
    else tasks.forEach((task, i)=>{showSingle(task)})
}

function setFormDate(task){
    mainDataHeads.forEach( head => formData.elements[head].value =task[head]);
}

function showSingle(task){
    col4Div = createNewElement('div', '', 'col-4 x', tasksWrap, [])
    contentDiv = createNewElement('div', '', 'm-3 border border-primary border-3 p-2 bg-danger text-white', col4Div, [])
    createNewElement('h3', task.taskTitle, '',contentDiv, [])
    createNewElement('p', task.taskContent, '',contentDiv, [])
    btndel = createNewElement('button', 'delete', 'btn btn-warning', contentDiv, []) 
    btnEdit = createNewElement('button', 'edit', 'btn btn-warning', contentDiv, []) 
    btndel.addEventListener('click',function(e) {deleteTask(task)})
    btnEdit.addEventListener('click',function(e) {editTask(task)})
}

function reset(){
    formData.reset();
    addEditbtn.innerText='Add Task';
    isEditMode=false;
    showHideEvent(showHidebtn);
}

showHidebtn.addEventListener('click', showHideEvent )
formData.addEventListener('submit', addTask)

showTasks()
