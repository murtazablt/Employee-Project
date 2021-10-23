export class UI {
    constructor() {
        this.employeeList = document.getElementById("employees")
        this.updateButton = document.getElementById("update")
        this.nameInput = document.getElementById("name")
        this.departmentInput = document.getElementById("department")
        this.salaryInput = document.getElementById("salary")
        this.firstCardBody = document.getElementsByClassName("card-body")[0]

    }


    addAllEmployeeToUI(employees) {
        this.employeeList.innerHTML = ""
        
        employees.forEach(employee => {
            
            this.employeeList.innerHTML += `
            <tr>
                                            
                <td>${employee.name}</td>
                <td>${employee.department}</td>
                <td>${employee.salary}</td>
                <td>${employee.id}</td>
                <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
                <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
                </tr>
            `
        });
    }
    clearInputs(){
        this.nameInput.value = ""
        this.salaryInput.value = ""
        this.departmentInput.value = ""
    }

    showAlert(message,type){
        const div = document.createElement("div")
        div.innerHTML = `
        <div class="alert alert-${type}" role="alert">
            ${message}
        </div>
        `
        this.firstCardBody.appendChild(div)

        setTimeout(() => {
            div.remove()
        }, 2000);
    }

    addEmployeeToUI(employee){
        this.employeeList.innerHTML += `
        <tr>
                                        
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>${employee.salary}</td>
            <td>${employee.id}</td>
            <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
            <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
            </tr>
        `
    }

    toggleUpdateButton(targetEmployee){
        if(this.updateButton.style.display === "none"){
            this.updateButton.style.display = "block"
            this.addEmployeeInfoToInputs(targetEmployee)
        }
        else{
            this.updateButton.style.display = "none"
            this.clearInputs()
        }
    }

    addEmployeeInfoToInputs(targetEmployee){
        let children = targetEmployee.children
        
        this.nameInput.value = children[0].textContent
        this.departmentInput.value = children[1].textContent
        this.salaryInput.value = children[2].textContent

    }

    updateEmployeeOnUI(employee,parent){
        parent.innerHTML = `
        <tr>
                                        
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>${employee.salary}</td>
            <td>${employee.id}</td>
            <td><a href="#" id = "update-employee" class= "btn btn-danger">Güncelle</a></td> 
            <td> <a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
            </tr>
        `
        this.clearInputs()
    }
}