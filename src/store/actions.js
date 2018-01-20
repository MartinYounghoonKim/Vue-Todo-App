import TODO from '../constant/mutation-type';
import { getTodoList, setTodoItem, updateTodoItem, deleteTodoItem, completeTodo, completeAllTodos } from '../api/todoAPI';

export default {
    setCurrentLocation: ({ commit }, location) => {
        commit('setCurrentLocation', location);
    },
    getTodoList: ({ commit }) => {
        getTodoList().then( res => {
            commit( TODO.LIST, res.data );
        });
    },
	addTodo: ({ commit }, todoItem) => {
        setTodoItem(todoItem).then( res => {
            commit(TODO.ADD, res.data);
        });
	},
	editTodo: ({ commit }, payload) => {
        updateTodoItem(payload).then( res => {
            commit(TODO.EDIT, res.data );
        });
	},
	deleteTodo: ({ commit, state }, targetKey) => {
		const deleteTargetKey =  state.todos.findIndex( v => targetKey === v.id);

        deleteTodoItem(targetKey).then( res => {
            commit(TODO.DELETE, deleteTargetKey);
        });
	},
	completeTodo: (commit, payload) => {
        completeTodo(payload);
	},
	completeAllTodos: ({ commit, state }) => {
        const isCompleteAll = !state.todos.every(v => v.isDone === true);
        const payload = Object.assign( { todos: state.todos} , { isCompleteAll } );

        completeAllTodos(payload).then( res => {
            commit(TODO.ALL_COMPLETE, res );
        })
	}
}
