import Vue from 'vue'
//import App from './App.vue'
import App from '@/App.vue'

// vue resource => Plugin para las HTTP Request
	import VueResource from 'vue-resource';
	Vue.use(VueResource);
	// Configuro la API a utilizar
	Vue.http.options.root = 'http://localhost:3333/api/v1/';
	// Defino interceptor para que cada request siempre se ejecute con Token 
	Vue.http.interceptors.push((request, next) => {
		request.headers.set('Authorization', `Bearer ${window.localStorage.getItem('_token')}`);
		next();
	});
// .vue resource

// vuex => Almacen de datos de la App
	import Vuex from 'vuex';
	Vue.use(Vuex);
// .vuex

// blockui => Bloqueo de pantalla
	import BlockUI from 'vue-blockui';
	Vue.use(BlockUI);
// .blockui

// Modulos y Tipos
	import globalTypes from '@/types/global';
// .Modulos y Tipos

// vee-validate => Validacion de Forms
	import VeeValidate, {Validator} from 'vee-validate';
	// Validar las traducciones
	import validatorEs from '@/validator/es';
	import validatorEn from '@/validator/en';
	// Cargar idioma Espanol por default
	Validator.localize('es', validatorEs);
	Vue.use(VeeValidate);
// .vee-validate

// vue-tables-2
	import {ClientTable} from 'vue-tables-2';
	Vue.use(ClientTable, {}, false, 'bootstrap3', 'default');
// .vue-tables-2

// Almacen global de datos con vuex => Config Tienda Global y modulos
	export const store = new Vuex.Store({
		// Implementacion de lo que se definio en /src/types/global.js
		state: {
			processing: false,
			language: 'es'
		},
		actions: {
			// Ejemplo de como ejecutar esta accion desde cualquier sitio de la App:
			// store.dispatch(globalTypes.actions.changeLanguage, 'en').then()
			[globalTypes.actions.changeLanguage]: ({commit}, lang) => {
				commit(globalTypes.mutations.setLanguage, lang);
				// Establecer validaciones de traduccion
				switch(lang) {
					case 'en': {
						Validator.localize('en', validatorEn);
						break;
					}
					case 'es': {
						Validator.localize('es', validatorEs);
						break;
					}
				}
			}
		},
		getters: {
			[globalTypes.getters.processing]: state => state.processing,
			[globalTypes.getters.language]: state => state.language,
		},
		mutations: {
			// 1er param intocable => state de la App, (arriba), 2o = Payload a cargar
			[globalTypes.mutations.setLanguage] (state, lang) {
				state.language = lang;
			},
			[globalTypes.mutations.startProcessing] (state) {
				state.processing = true;
			},
			[globalTypes.mutations.stopProcessing] (state) {
				state.processing = false;
			}
		},
		modules: {

		}
	});
// .Almacen global de datos con vuex

// vue traducciones
	import VueI18n from  'vue-i18n';
	Vue.use(VueI18n);
	// Inyectar mensajes y traducciones del archivo /translations/index.js
	import messages from '@/translations';
	const i18n = new VueI18n({
		locale: store.state.language,
		messages
	})
// .vue traducciones

new Vue({
  el: '#app',
  render: h => h(App),
  // Agregar Store => Almacen central de datos definido arribass
  store,
  // utilizar las traducciones
  i18n
})
