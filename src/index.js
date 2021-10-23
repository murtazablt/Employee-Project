import { Requests } from "./requests"
import { UI } from "./ui"

//Elements Selecting
const form = document.getElementById("employee-form")
const nameInput = document.getElementById("name")
const departmentInput = document.getElementById("department")
const salaryInput = document.getElementById("salary")
const employeesList = document.getElementById("employees")
const updateEmployeeButton = document.getElementById("update")

const request = new Requests("http://localhost:3000/employees")
const ui = new UI()

let updateState = null

eventListeners()

function eventListeners() {
    document.addEventListener("DOMContentLoaded", getAllEmployees)
    form.addEventListener("submit",addEmployee)
    employeesList.addEventListener("click",updateOrDelete)
    updateEmployeeButton.addEventListener("click",updateEmployee)
}


function getAllEmployees() {
    request.get()
    .then(employees => {
        ui.addAllEmployeeToUI(employees)
    
    
    })
    .catch(err => console.log(err))

}

function addEmployee(e){
    const employeeName = nameInput.value.trim()
    const employeeDepartment = departmentInput.value.trim()
    const employeeSalary = Number(salaryInput.value.trim())

    if(employeeName === "" || employeeDepartment === "" || employeeSalary === ""){
        ui.showAlert("Lütfen bütün alanları doldurunuz.","danger")
    }
    else{
        request.post({
            name: employeeName,
            department: employeeDepartment,
            salary: employeeSalary,
          })
          .then(employee => {
              ui.addEmployeeToUI(employee)
          })
          .catch(err => console.log(err))
          
    }


    ui.clearInputs()
    e.preventDefault()
}

function updateOrDelete(e){
    if(e.target.id === "delete-employee"){
        deleteEmployee(e)
    }
    else if(e.target.id === "update-employee"){
        updateEmployeeController(e)
    }
}

function deleteEmployee(e){
    let targetElementID = Number(e.target.parentElement.previousElementSibling.previousElementSibling.textContent)
   
    request.delete(targetElementID)
    .then(result => {
        console.log(result)
        ui.showAlert("Silme işlemi başarılı!","success")
        getAllEmployees()
    })
    .catch(err => console.log(err))
    
}

function updateEmployeeController(e){
    let targetEmployee = e.target.parentElement.parentElement
    ui.toggleUpdateButton(targetEmployee)
   
    if(updateState === null){
        updateState = {
            updateID: Number(targetEmployee.children[3].textContent),
            updateParent: targetEmployee
        }
    }
    else{
        updateState = null
    }

}

function updateEmployee(){
    if (updateState) {
        const data = {
            name: nameInput.value.trim(),
            department: departmentInput.value.trim(),
            salary: Number(salaryInput.value.trim())
        }
        request.put(updateState.updateID,data)
        .then(updatedEmployee => {
            ui.updateEmployeeOnUI(updatedEmployee,updateState.updateParent)
            
        })
        .catch(err => console.log(err))
    }

}