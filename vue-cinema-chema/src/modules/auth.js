
// Modulo de Authentication

import types from '@/types/auth';
import globalTypes from '@/types/global';
import Vue from 'vue';

const state = {
	user: null,
	logged: !!window.localStorage.getItem('_token'),
};

const actions = {
	// Pasar los datos del form Login
	[types.actions.login]: ({commit}, userInput) => {
		// Bloquear pantalla
		commit(globalTypes.mutations.startProcessing);
		// Promesa JS
		return new Promise((resolve, reject) => {
			Vue.http.post('login', {user: userInput})
			.then(user => {
				window.localStorage.setItem('_token', user.body.token);
				commit(types.mutations.setUser);
				// Respuesta de la promesa al ser ejecutada
				resolve(user);
			})
			.catch(error => {
				reject(error);
			})
			.finally(() => {
				// Desbloquear pantalla
				commit(globalTypes.mutations.stopProcessing);
			})
		})
	},

	// Action para Registro de Usuario
	[types.actions.register]: ({commit}, userInput) => {
		commit(globalTypes.mutations.startProcessing);
		return new Promise((resolve, reject) => {
			Vue.http.post('register', {user: userInput})
			.then(user => {
				resolve(user);
			})
			.catch(error => {
				reject(error);
			})
			.finally(() => {
				// Desbloquear pantalla
				commit(globalTypes.mutations.stopProcessing);
			})
		})
	},

	// Actualizar Usuario
	[types.actions.updateProfile]: ({commit}, userInput) => {
		commit(globalTypes.mutations.startProcessing);
		return new Promise((resolve, reject) => {
			Vue.http.put('profile', {user: userInput})
			.then(user => {
				// Al hacer update, tambien se debe actualizar el Token
				window.localStorage.setItem('_token', user.body.token);
				commit(types.mutations.setUser);
				resolve(user);
			})
			.catch(error => {
				reject(error);
			})
			.finally(() => {
				commit(globalTypes.mutations.stopProcessing);
			})
		})
	},

	// Cerrar sesion Usuario
	[types.actions.logout]: ({commit}) => {
		window.localStorage.reomoveItem('_token');
		//commit(types.mutations.setUser, {user: null});  // Otra forma
		commit(types.mutations.setUser);
	}

};

const getters = {
	// Obtenemos el user
	[types.getters.user]: (state) => {
		return state.user;
	},

	// Esta logueado ?
	[types.getters.logged]: (state) => {
		return state.logged;
	}
};

const mutations = {
	// Establecer el user mediante token jwt
	[types.mutations.setUser]: (state) => {
		if(window.localStorage.getItem('_token')){
			const token = window.localStorage.getItem('_token');
			const jwtDecode = require('jwt-decode');
			// Usuario decodificado enviado desde la Api
			state.user = jwtDecode(token);
			state.logged = true;
		} else {  
			state.logged = false;
			state.user = null;
		}
	},

	// Establecemos el Estado del usuario
	[types.mutations.setLogged]: (state, logged) => {
		state.logged = logged;
	}
};

// Al realizar el Export, ya se puede utilizar dentro del main.js
export default {
	state,
	actions,
	getters,
	mutations
}