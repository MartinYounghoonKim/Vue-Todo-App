const todoGetters = {
	isAllChecked (state) {
		return state.todos.every( todo => todo.isDone === true);
	},
	getTodosCounter (state) {
		return state.todos.filter( v=> v.isDone === true ).length;
	},
    getTodoList (state) {
	    return state.todos;
    }
};

export default todoGetters;
