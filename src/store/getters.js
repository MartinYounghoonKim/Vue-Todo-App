const todoGetters = {
	isAllChecked (state) {
		return state.todos.every( todo => todo.isDone === true);
	},
	getTodosCounter (state) {
		return state.todos.filter( v=> v.isDone === true ).length;
	},
    getTodoList (state) {
	    const currentLocation = state.location;

        return state.todos.filter(todo => {
            switch (true) {
                case currentLocation === '/all' || currentLocation === '/' :
                    return true;
                    break;
                case currentLocation === '/active' && !todo.isDone :
                    return true;
                    break;
                case currentLocation === '/completed' && todo.isDone :
                    return true;
                    break;
            }

        })
    }
};

export default todoGetters;
