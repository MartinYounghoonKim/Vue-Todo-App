import TODO from '../constant/mutation-type';

export default {
    setCurrentLocation: (state, location) => {
        state.location = location;
    },
    [TODO.LIST](states, payload) {
        states.todos = payload;
    },
    [TODO.ADD](states, payload) {
        states.todos = [...states.todos, payload];
    },
    [TODO.EDIT](states, payload) {
        const targetKey = payload.id;
        const editedTodo = payload.editedTodo;

        states.todos.splice(states.todos.findIndex(v => v.id === targetKey), 1, payload);
    },
    [TODO.DELETE](states, deleteTargetKey) {
        states.todos.splice(deleteTargetKey, 1);
    },
    [TODO.ALL_COMPLETE](states, payload) {
        states.todos = payload.map(v => v.data);
    }
}
