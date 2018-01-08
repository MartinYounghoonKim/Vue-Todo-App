const todoGetters = {
	isAllChecked (state) {
		return state.todos.every( todo => todo.isDone === true);
	},
	getTodosCounter (state) {
		return state.todos.filter( v=> v.isDone === true ).length;
	}
};

export default todoGetters;
