import axios from 'axios';

const todoApi = axios.create({
    baseURL: 'http://localhost:2403/todos',
    timeout: 1000,
    responseType: 'json'
});
export const getTodoList = () => {
    if (!localStorage.todos) {
        localStorage.setItem('todos', JSON.stringify( [] ) );
    }
    return new Promise( resolve => {
        resolve({ data: JSON.parse(localStorage.todos) });
    })
};

export const setTodoItem = ( todo ) => {
    const todos = JSON.parse(localStorage.todos);
    var number = Math.random();
    number.toString(36);
    var id = number.toString(36).substr(2, 9);
    todos.push( { id, todo, isDone: false } );

    localStorage.setItem('todos', JSON.stringify( todos ) );

    return new Promise( resolve => {
        resolve({
            data: {
                id,
                todo,
                isDone: false
            }
        })
    });
};

export const updateTodoItem = (payload) => {
    const todos = JSON.parse(localStorage.todos);
    const targetKey = payload.id;
    const editedTodo = payload.editedTodo;

    const editedTodoIndex = todos.findIndex(v => v.id === targetKey);
    const todo = todos[editedTodoIndex];
    todo.todo = editedTodo;

    todos.splice(editedTodoIndex, 1, todo);
    localStorage.setItem('todos', JSON.stringify( todos ) );
    return new Promise( resolve => {
        resolve({
            data: todo
        })
    });
};

export const deleteTodoItem = (targetKey) => {
    const todos = JSON.parse(localStorage.todos);
    const deleteTargetKey =  todos.findIndex( v => targetKey === v.id);
    todos.splice(deleteTargetKey, 1);
    localStorage.setItem('todos', JSON.stringify( todos ) );
    return new Promise( resolve => {
        resolve({ data: true })
    })
};

export const completeTodo = (payload) => {
    const todos = JSON.parse(localStorage.todos);
    const primayKey = payload.id;
    const isDone = !payload.isDone;

    const editedTodoIndex = todos.findIndex(v => v.id === primayKey);
    const todo = todos[editedTodoIndex];
    todo.isDone = isDone;
    todos.splice(editedTodoIndex, 1, todo);
    localStorage.setItem('todos', JSON.stringify( todos ) );

    return new Promise( resolve => {
        resolve({
            data: todo
        })
    });
};

export const completeAllTodos = (payload) => {
    const { isCompleteAll, todos } = payload;

    return axios.all(
        todos.map( todo => todoApi.put(`${todo.id}`, { isDone: isCompleteAll }))
    )
};
