
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

// Components

// .Components


// types
import authTypes from '@/types/auth';
import globalTypes from '@/types/global';
// .types


// global store
import {store} from '@/main';
// .global store

// Config Router
const router = new Router({
	routes: [

	]
});
// .Config Router

// Para cada cambio de ruta
	// Definir de donde venimos, a donde vamos y que vamos a hacer
	// /*
	router.beforeEach((to, from, next) => {
		// Establecer el titulo para cada peticion, dependiendo en la pag 
		document.title = to.meta.title;
		// Comprobamos si la ruta requiere auth y si el usuario esta autenticado
		if(to.meta.Auth && !store.state.authModule.logged){
			// Si no esta autenticado, redirigir a: 
			next({path: '/login'});
		} else {
			if(store.state.authModule.logged){

			}
			next();
		}		
	});
	// */
// .Para cada cambio de ruta


// Exportarlo para poderlo usar en el main.js
export default router;