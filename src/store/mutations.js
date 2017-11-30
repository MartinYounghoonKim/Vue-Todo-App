import TODO from '../constant/mutation-type';

const todoMutations = {
  [TODO.ADD] (state, payload){
    state.todos = [...state.todos, payload];
  },
  [TODO.EDIT] (state, payload) {
    const targetKey = payload.id;
    const editedTodo = payload.editedTodo;
        
    state.todos.splice( state.todos.findIndex(v => v.id === targetKey), 1, payload);
  },
  [TODO.DELETE] (state, deleteTargetKey) {
    state.todos.splice(deleteTargetKey, 1);
  },
  [TODO.ALL_COMPLETE] (state, payload) {
    state.todos = payload.map( v=>v.data );
  }
}

export default todoMutations;