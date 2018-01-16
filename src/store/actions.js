import axios from 'axios';
import TODO from '../constant/mutation-type';
import TodoApi from '../api/todoAPI';
import { getTodoList, setTodoItem, updateTodoItem, deleteTodoItem, completeTodo, completeAllTodos } from '../api/todoAPI';

export default {
    setCurrentLocation: ({ commit }, location) => {
        commit('setCurrentLocation', location);
    },
    [TODO.LIST] ({ commit }) {
        getTodoList().then( res => {
            commit( TODO.LIST, res.data );
        });
    },
	[TODO.ADD] ({ commit }, todoItem) {
        setTodoItem(todoItem).then( res => {
            commit(TODO.ADD, res.data);
        });
	},
	[TODO.EDIT] ({ commit }, payload) {
        updateTodoItem(payload).then( res => {
            commit(TODO.EDIT, res.data );
        });
	},
	[TODO.DELETE] ({ commit }, payload) {
		const deleteTargetKey =  payload.deleteTargetKey;

        deleteTodoItem(payload).then( res => {
            commit(TODO.DELETE, deleteTargetKey);
        });
	},
	[TODO.COMPLETE] (commit, payload) {
        completeTodo(payload);
	},
	[TODO.ALL_COMPLETE] ({ commit, state }) {
        const isCompleteAll = !state.todos.every(v => v.isDone === true);
        const payload = Object.assign( { todos: state.todos} , { isCompleteAll } );

        completeAllTodos(payload).then( res => {
            commit(TODO.ALL_COMPLETE, res );
        })
	}
}
