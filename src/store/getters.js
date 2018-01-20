export default {
	isAllChecked (states) {
		return states.todos.every( todo => todo.isDone === true);
	},
	getTodosCounter (states) {
		return states.todos.filter( v=> v.isDone === true ).length;
	},
    getTodoList (states) {
	    const currentLocation = states.location;

        return states.todos.filter(todo => {
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
