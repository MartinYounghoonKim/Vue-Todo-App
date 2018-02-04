import axios from 'axios';

const todoApi = axios.create({
    baseURL: 'http://localhost:2403/todos',
    timeout: 1000,
    responseType: 'json'
});

export const getTodoList = () => {
    // localStorage.setItem('todos', JSON.stringify( [{ id: 100, todo: 'test', isDone: false }] ) );
    return new Promise( resolve => {
        resolve({ data: JSON.parse(localStorage.todos) });
    })
};

export const setTodoItem = ( todo ) => {
    const todos = JSON.parse(localStorage.todos);
    todos.push( {id: 100, todo, isDone: false } );

    localStorage.setItem('todos', JSON.stringify( todos ) );

    return new Promise( resolve => {
        resolve({
            data: {
                id: 100,
                todo,
                isDone: false
            }
        })
    });
};

export const updateTodoItem = (payload) => {
    const targetKey = payload.id;
    const editedTodo = payload.editedTodo;

    return todoApi.put(`${targetKey}`, {
        todo: editedTodo
    })
};

export const deleteTodoItem = (targetKey) => {
    return todoApi.delete(`${targetKey}`)
};

export const completeTodo = (payload) => {
    const primayKey = payload.id;
    const isDone = !payload.isDone;

    todoApi.put(`/${primayKey}`,{
        isDone: isDone
    })
};

export const completeAllTodos = (payload) => {
    const { isCompleteAll, todos } = payload;
    console.log( todoApi.all );

    return axios.all(
        todos.map( todo => todoApi.put(`${todo.id}`, { isDone: isCompleteAll }))
    )
};
