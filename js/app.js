let inputTodo = document.getElementById('txt');
let adderTodo = document.getElementById('adder');
let todoList = document.getElementById('todoList');
let select = document.querySelector('select');
window.addEventListener('load', () => {
    getTodos();
})
adderTodo.addEventListener('click', (e) => {
    addItem();
})
frm.addEventListener('submit', (e) => {
    e.preventDefault();
    addItem();

})
//add item to list
function addItem() {
    if (inputTodo.value != '') {
        let newElm = document.createElement('div');
        newElm.classList = 'todo';
        newElm.innerHTML = ` <p>
                ${inputTodo.value} 
            </p>
            <span>
                <i class="fas fa-check-square check"></i>
                <i class="fas fa-trash-alt trash"></i>
            </span>`;
        todoList.append(newElm);
        saveTodos({value:inputTodo.value,className:''});
        inputTodo.value = '';
    }
}
todoList.addEventListener('click', (e) => {
    let lists = [...e.target.classList];
    if (lists[2] === 'trash') {
        let getP = e.target.closest('.todo');
        let getText = getP.querySelector('p').textContent;
        getText = getText.trim();
        e.target.closest('.todo').remove();
        removeTodo(getText);
    } else if (lists[2] === 'check') {
        e.target.closest('.todo').classList.toggle('comp');
        let parent=e.target.parentElement.parentElement;
        let getText=parent.querySelector('p').innerText;
        updateTodo(getText);
    }

})
select.addEventListener('change', (e) => {
    let target = e.target.value;
    let getElms = todoList.childNodes;
    getElms = [...getElms];
    switch (target) {
        case 'all':
            getElms.forEach(elm => {
                elm.style.display = 'flex';
            })
            break;
        case 'completed':
            getElms.forEach(elm => {
                if (elm.classList.contains('comp')) {
                    elm.style.display = 'flex';
                } else {
                    elm.style.display = 'none';
                }
            })

            break;
        case 'uncompleted':
            getElms.forEach(elm => {
                if (!elm.classList.contains('comp')) {
                    elm.style.display = 'flex';
                } else {
                    elm.style.display = 'none';
                }
            })
            break;

    }
})

function saveTodos(todo) {
    let getTodos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    getTodos.push(todo);
    localStorage.setItem('todos', JSON.stringify(getTodos));
}

function getTodos() {
    let getTodos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    getTodos.forEach((todo) => {
        let newElm = document.createElement('div');
        newElm.classList = `todo ${todo.className}`;
        newElm.innerHTML = ` <p>
                ${todo.value} 
            </p>
            <span>
                <i class="fas fa-check-square check"></i>
                <i class="fas fa-trash-alt trash"></i>

            </span>`;
        todoList.append(newElm);
    })
}

function removeTodo(todo) {
    let getTodos = JSON.parse(localStorage.getItem('todos'));
    let filterTodos = getTodos.filter(function (value) {
        return value.value !== todo;
    })
    localStorage.setItem('todos', JSON.stringify(filterTodos));
}

function updateTodo(todo){
    const getTodos=JSON.parse(localStorage.getItem('todos'));
    const findTodo=getTodos.find(value=>value.value == todo);
    if(findTodo.className == ''){
        findTodo.className='comp';
    }else{
        findTodo.className='';
    }
    localStorage.setItem('todos', JSON.stringify(getTodos));
}