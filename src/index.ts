
import {v4 as uuidv4 } from "uuid"

console.log(uuidv4())

type Task = {
  id:string,
    title:string,
    complated:boolean,
    createdAt:Date
}


const list = document.querySelector<HTMLUListElement>("#list")

const form = document.getElementById("new-task-form") as HTMLFormElement | null

const input = document.querySelector<HTMLInputElement>("#new-task-title")
const tasks:Task[]=loadTasks()
tasks.forEach(addListItem)


form?.addEventListener("submit",e=>{
  e.preventDefault()

  if(input?.value==""||input?.value==null) return 

  const newTask:Task = {
    id: uuidv4(),
    title:input.value,
    complated:false,
    createdAt:new Date()
  }
  tasks.push(newTask)

  addListItem(newTask)
  input.value=""

})

function addListItem(task:Task){
const item = document.createElement("li")
const label = document.createElement("label")
const checkbox = document.createElement("input")
checkbox.addEventListener("change",()=> {
  task.complated=checkbox.checked
  saveTasks()
})
checkbox.type="checkbox"
checkbox.checked=task.complated
label.append(checkbox,task.title)
item.append(label)
list?.append(item)

}
 
function saveTasks(){
  localStorage.setItem("TASKS",JSON.stringify(tasks))
}

function loadTasks(){
  const taskJson = localStorage.getItem("TASKS")
  if(taskJson==null) return []
  return JSON.parse(taskJson)
}