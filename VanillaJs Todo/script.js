
'use strict'
const todos = []
const stringyTodos = JSON.stringify(todos);
const subBtn = document.querySelector('#submitBtn');
const todoInput = document.querySelector('#Input');
const tasksContainer = document.querySelector('#tasksContainer');
const Taskbuilder = function () {
    this.taskTxt = 'something';
    this.ID = idMaker();
    this.delBtnID = `${this.ID}delBtnelement`
    this.editBtnID = `${this.ID}editBtnelement`
    this.editBtn = `<button id = '${this.editBtnID}'> e</button> `;
    this.delBtn = `<button id = '${this.delBtnID}'> X</button> `;


}
let idmakerId = -1;
const idMaker = () => {

    idmakerId++
    return idmakerId

};

//clone obj and paste into array 
const pushtaskObjinArray = function () {
    let todoLength = todos.length;

    todos[todoLength] = new Taskbuilder();
    todos[todoLength].taskTxt = todoInput.value;


}
//printToHtml
const printToHtml = () => {


    tasksContainer.innerHTML = ''
    todos.forEach(function (todo) {

        const html = `<li id='x${todo.ID}'> ${todo.delBtn} ${todo.editBtn} ${todo.taskTxt}  </li> `;
        tasksContainer.insertAdjacentHTML('beforeend', html);

    })
}
// ----------------edit-------------------
const addeventlistnersToEditBtns = function () {
    const editBtnArr = []

    todos.forEach((todo, i) => {
        editBtnArr[i] = [todo.ID, document.getElementById(`${todo.editBtnID}`)]


    })

    editBtnArr.forEach((element) => {

        element[1].addEventListener('click', () => {

            let selectedTaskIndex = todos.findIndex(x => x.ID === element[0])
            todos[selectedTaskIndex].taskTxt = prompt("تغییرات را اعمال کنید", selectedTaskIndex)
            console.log(todos[selectedTaskIndex]);



        })
    })

}
//----------------del------------------
const addeventlistnersTodelBtns = function () {
    const dlBtnArr = []

    todos.forEach((todo, i) => {
        dlBtnArr[i] = [todo.ID, document.getElementById(`${todo.delBtnID}`)];



    })

    dlBtnArr.forEach((element) => {

        element[1].addEventListener('click', () => {
            document.querySelector(`#x${element[0]}`).remove();
            todos.splice(element[0], 1);
            dlBtnArr.splice(element[0], 1);
            console.log(element, todos);



        })
    })

}

const savetoLocalstorage = function () {
    localStorage.setItem("to do list", stringyTodos);
}
const gettoLocalstorage = function () {
    localStorage.getItem("to do list");
}



function test(addnewTask, onceOrnot) {

    subBtn.addEventListener('click', function mainFunc() { //add task to list 
        if (addnewTask) { pushtaskObjinArray(); }

        printToHtml();
        addeventlistnersToEditBtns();
        addeventlistnersTodelBtns();
        console.log(todos);

    }, { once: onceOrnot })


}
test('yes');
