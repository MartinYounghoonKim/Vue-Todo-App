const todoApi = (() => {
    return {
        fetch: () => JSON.parse(localStorage.todos),
        post: (todo) => {
            const todos = JSON.parse(localStorage.todos);
            const number = Math.random();
            const id = number.toString(36).substr(2, 9);
            const item = { id, todo, isDone: false };

            todos.push( item );
            localStorage.setItem('todos', JSON.stringify( todos ) );
            return item;
        },
        update: (id, text) => {
            const todos = JSON.parse(localStorage.todos);
            const targetKey = id;
            const editedTodo = text;
            const editedTodoIndex = todos.findIndex(v => v.id === targetKey);
            const todo = todos[editedTodoIndex];

            todo.todo = editedTodo;
            todos.splice(editedTodoIndex, 1, todo);

            localStorage.setItem('todos', JSON.stringify( todos ) );
            return todo;
        },
        delete: (id) => {
            const todos = JSON.parse(localStorage.todos);
            const deleteTargetKey =  todos.findIndex( v => id === v.id);

            todos.splice(deleteTargetKey, 1);

            localStorage.setItem('todos', JSON.stringify( todos ) );
        }
    }
})();

export const getTodoList = () => {
    if (!localStorage.todos) {
        localStorage.setItem('todos', JSON.stringify( [] ) );
    }
    return new Promise( resolve => {
        resolve({ data: todoApi.fetch() });
    })
};

export const setTodoItem = ( todo ) => {
    const item = todoApi.post(todo);

    return new Promise( resolve => {
        resolve({
            data: item
        })
    });
};

export const updateTodoItem = (payload) => {
    const { id, editedTodo } = payload;
    const item = todoApi.update(id, editedTodo);

    return new Promise( resolve => {
        resolve({
            data: item
        })
    });
};

export const deleteTodoItem = (targetKey) => {
    todoApi.delete(targetKey);

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
    const todos = todoApi.fetch();
    const { isCompleteAll } = payload;
    todos.map( todo => {
        completeTodo(todo)
    });
    console.log(todos)
    return new Promise( resolve => {
        resolve({
            data: true
        })
    })

    // return axios.all(
    //     todos.map( todo => todoApi.put(`${todo.id}`, { isDone: isCompleteAll }))
    // )
};
