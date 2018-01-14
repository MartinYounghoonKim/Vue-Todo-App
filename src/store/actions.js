import axios from 'axios';
import TODO from '../constant/mutation-type';
import TodoApi from '../api/api_core';

export default {
    setCurrentLocation: ({ commit }, location) => {
        commit('setCurrentLocation', location);
    },
    [TODO.LIST] ({ commit }) {
        TodoApi.get('/')
            .then( res => {
                commit( TODO.LIST, res.data );
            })
    },
	[TODO.ADD] ({ commit }, payload) {
		TodoApi.post(`/`,{
			todo: payload
		}).then((result)=>{
			commit(TODO.ADD, result.data)
		})
	},
	[TODO.EDIT] ({ commit }, payload) {
		const targetKey = payload.id;
		const editedTodo = payload.editedTodo;

		TodoApi.put(`/${targetKey}`, {
			todo: editedTodo
		})
		.then((result)=>{
			commit(TODO.EDIT, result.data );
		})
	},
	[TODO.DELETE] ({ commit }, payload) {
		const targetKey = payload.targetKey;
		const deleteTargetKey =  payload.deleteTargetKey;

		TodoApi.delete(`/${targetKey}`)
		.then((result)=>{
			if(result.status===200){
				commit(TODO.DELETE, deleteTargetKey);
			}
		})
	},
	[TODO.COMPLETE] (commit, payload) {
		const primayKey = payload.id;
		const isDone = !payload.isDone;

		TodoApi.put(`/${primayKey}`,{
			isDone: isDone
		})
	},
	[TODO.ALL_COMPLETE] ({ commit, state }, payload) {
		const isCompleteAll = payload;

		axios.all(
			state.todos.map(
				v=> TodoApi.put(v.id, { isDone: isCompleteAll })
			)
		)
		.then((result)=>{
				commit(TODO.ALL_COMPLETE, result );
		})
	}
}
