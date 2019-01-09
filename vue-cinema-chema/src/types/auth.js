import namespace from '@/utils/namespace';

export default namespace('auth', {
	getters: [  
		'user',  // Datos del usuario
		'logged' // Estatus de Login
	],
	actions: [  
		'login',
		'register',
		'logout',
		'updateProfile'	// Actualizar perfil mediante un PUT a la API
	],
	mutations: [
		'setUser', // Establecer usuario una vez hecho el Login
		'setLogged' // True = User autenticado
	]
});