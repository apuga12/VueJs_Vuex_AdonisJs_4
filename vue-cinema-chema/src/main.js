import Vue from 'vue'
//import App from './App.vue'  // Se hizo alias del . en webpack.config.js
import App from '@/App.vue'

//- Init vue-resource
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.http.options.root = 'http://127.0.0.1:3333/api/v1/';
// Ejemplo de consulta para iniciar sesión / mandar Token con interceptor:
Vue.http.interceptors.push((request, next) => {
	// Seteo header token (Se envía en cada petición, esté o no el Token)
	// Siempre enviamos => Bearer, Adonis hace un Split con espacio y se queda el token
	request.headers.set('Authorization', `Bearer ${window.localStorage.getItem('_token')}`);
	next();
});
//- Fin vue-resource

//- Inicio Vuex
import Vuex from 'vuex';
Vue.use(Vuex);
//- Fin Vuex

//- Inicio blockui
import BlockUI from 'vue-blockui';
Vue.use(BlockUI);
//- Fin blockui

//- INICIO => MODULOS Y TIPOS
import globalTypes from '@/types/global';
import authModule from '@/modules/auth';
//- FIN => MODULOS Y TIPOS

//- vee-validate 
import VeeValidate, {Validator} from 'vee-validate';
// validador con traducciones
import validatorEs from '@/validator/es';
import validatorEn from '@/validator/en';
// Cargar por default idioma español
Validator.localize('es', validatorEs);
Vue.use(VeeValidate);
//- .vee-validate

//- vue-tables-2 ==> Uso de tablas con Bootstrap
//- Recomendable no vincular con el Storage Vuex (false)
import {ClientTable} from 'vue-tables-2';
Vue.use(ClientTable, {}, false, 'bootstrap3', 'default');
//- .vue-tables-2


/////////////////////////////////////////////////////////////
//- INICIO => ALMACEN CENTRAL DATOS: Vuex
//- Config global de la tienda y a nivel módulos (iniciar modulo)
export const store = new Vuex.Store({	
	state: {
		processing: false,
		language: 'es'
	},
	actions: {
		// Destructuracion del objeto, y aplicar la mutacion con commit
		[globalTypes.actions.changeLanguage]: ({commit}, lang) => {
			commit(globalTypes.mutations.setLanguage, lang);
			switch(lang){
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
		//- Acceder a información del state
		[globalTypes.getters.processing]: state => state.processing,
		[globalTypes.getters.language]: state => state.language,		
	},
	mutations: {
		//- 1er param: es state (state actual del store definido arriba) no se toca
		//- 2o param: es el Payload que le estamos enviando: lang
		[globalTypes.mutations.setLanguage] (state, lang) {
			state.language = lang;
		},
		[globalTypes.mutations.startProcessing] (state){
			state.processing = true;
		},
		[globalTypes.mutations.stopProcessing] (state){
			state.processing = false;
		}
	},
	modules: {  // Se crean los modulos en /src/modules/myModule y para usarlo, declararlo aquí
		authModule
	}
});
//- FIN => ALMACEN CENTRAL DATOS: Vuex
/////////////////////////////////////////////////////////////

//- vue traducciones
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
// cargar archivo /src/translations/index.js
import messages from '@/translations';
//- Para que utlice las traducciones: 
//- Creamos instancia, le pasamos un obj
const i18n = new VueI18n({
	locale: store.state.language,
	messages
	//messages: messages  // También debe ser valido
});
//- .vue traducciones

new Vue({
  el: '#app',
  render: h => h(App),
  // Hacer uso de la tienda de datos Store:
  store,
  // Hacer uso de las traducciones:
  i18n
});
