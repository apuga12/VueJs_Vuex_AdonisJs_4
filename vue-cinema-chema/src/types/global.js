import namespace from '@/utils/namespace';

export default namespace('global', {
	actions: [  // Peticiones POST
		'changeLanguage'
	],
	getters: [  // Para devolver info o alterarla, 
	            //sino queremos acceder a la info modificada => Acceder al state
		'processing',  // Info que se está procesando => Así poder block pantalla
		'language'
	],
	mutations: [  // Para mapear resultados de salida:
		'startProcessing',  // Iniciar a procesar alguna petición
		'stopProcessing',  // Detener el proceso alguna petición
		'setLanguage'  // Para cambiar el lenguaje
	]
} );