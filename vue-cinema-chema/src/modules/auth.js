//- Imports
import types from '@/types/auth';
import globalTypes from '@/types/global';
import Vue from 'vue';  // Para las peticiones HTTP

// Inicializar el esqueleto del modulo: {state, actions, getters, mutations}
// Y se devuelve en un objeto, para que pueda ser insertado en la globla store
  const state = {
  	user: null,
  	//- Convertimos a booleano para saber si el user está loggeado
  	logged: !!window.localStorage.getItem('_token')
  };

  const actions = {
  	[types.actions.login]: ({commit}, userInput) => {
  		// Bloquear pantalla con blockui mientras se procesa la petición
  		commit(globalTypes.mutations.startProcessing); 

  		// Nueva promesa: Petición POST a login => 
  		return new Promise((resolve, reject) => {
  			Vue.http.post('login', {user: userInput})
  			.then(user => {
  				// Establecer el token
  				window.localStorage.setItem('_token', user.body.token);
  				// Obtengo token y aplico mutation
  				commit(types.mutations.setUser);
  				resolve(user);
  			})
  			// Capturar posible error en la Promesa...
  			.catch(error => {
  				reject(error);
  			})
  			.finally(() => {
  				// Desbloqueo de pantalla
  				commit(globalTypes.mutations.stopProcessing); 
  			})
  		})
  	},

  	// Action para registrarnos en la App
  	[types.actions.register]: ({commit}, userInput) => {
  		commit(globalTypes.mutations.startProcessing);
  		return new Promise((resolve, reject) => {
  			Vue.http.post('register', {user: userInput})
  			.then(user => {
  				resolve(user);
  			})
  			// Capturar posible error en la Promesa...
  			.catch(error => {
  				reject(error);
  			})
  			.finally(() => {
  				// Desbloqueo de pantalla
  				commit(globalTypes.mutations.stopProcessing); 
  			})
  		})
  	}, 

  	[types.actions.updateProfile]: ({commit}, userInput) => {
  		// Bloquear pantalla con blockui mientras se procesa la petición
  		commit(globalTypes.mutations.startProcessing); 

  		// Nueva promesa: Petición POST a login => 
  		return new Promise((resolve, reject) => {
  			Vue.http.put('profile', {user: userInput})
  			.then(user => {
  				// Establecer el token
  				window.localStorage.setItem('_token', user.body.token);
  				// Obtengo token y aplico mutation
  				commit(types.mutations.setUser);
  				resolve(user);
  			})
  			// Capturar posible error en la Promesa...
  			.catch(error => {
  				reject(error);
  			})
  			.finally(() => {
  				// Desbloqueo de pantalla
  				commit(globalTypes.mutations.stopProcessing); 
  			})
  		})
  	},

  	[types.actions.logout]: ({commit}) => {
  		window.localStorage.removeItem('_token');
  		// commit(types.mutations.setUser, {user: null});  // Lo forzo a NULL o por validacion:
  		commit(types.mutations.setUser);
  	}
  	// CIERRE: Actions...
  };

  const getters = {
  	//- Obtener el usuario
  	[types.getters.user]: state => state.user,

  	//- Otra opción para devolver el estado:
  	[types.getters.logged]: (state) => {
  		return state.logged;
  	} 
  };

  const mutations = {  	

  	// Establecer el user a través del token JWT
  	[types.mutations.setUser]: (state) => {
  		//- Comprobar si el user está loggeado
  		if(window.localStorage.getItem('_token')){
  			const token = window.localStorage.getItem('_token');
  			// Habilitar JWT
  			const jwtDecode = require('jwt-decode');
  			// User enviado decodificado desde nuestra API
  			// Enviamos un token desde la API al cliente
  			state.user = jwtDecode(token);
  			// Actualización del status Logged:
  			status.logged = true;

  		} else {
  			// - Inicializar el estado 
  			state.logged = false;
  			state.user = null;
  		}
  	},

  	// Persistir el status Logged
  	[types.mutations.setLogged]: (state, logged) => {
  		state.logged = logged;
  	},

  	
  };

  export default {
  	state,
  	actions,
  	getters,
  	mutations
  };