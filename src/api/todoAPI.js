import axios from 'axios';

const todoApi = axios.create({
    baseURL: 'http://localhost:2403/todos',
    timeout: 1000,
    responseType: 'json'
});

export const getTodoList = () => {
    return todoApi.get('/');
};

export const setTodoItem = ( todo ) => {
    return todoApi.post('/', {
        todo
    })
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
