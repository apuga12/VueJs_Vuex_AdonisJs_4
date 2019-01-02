'use strict'

// Acceder al modelo: User
const User = use('App/Models/User');

class AuthController {
	// Puedo acceder al objeto context completo, o solo a los elementos a utilizar, 
	// Como en este caso:
	async login({request, response, auth}){
		// Para atender una petición Post que envía un User:
		// Desestructurar el objeto y acceder a él.
		const { user } = request.all();
		// Con True en attemp, le indico al metodo que devuelva el payload con los datos User (visibles)
		const logged = await auth.attempt(user.email, user.password, true);
		//- Para generar la respuesta, debemos indicar qué tipo de formato es:
		//- Debido a que utlizamos JWT, si el user es correcto, entonces devuelve token de sesión
		return response.json(logged);
	}

	async register({request, response}){
		const userInstance = new User();
		const { user } = request.all();
		//- Definir los datos del usuario desde el modelo:
		userInstance.username = user.email;
		userInstance.email = user.email;
		// Se tiene un Hook en el Modelo User, para cuando se seta un password 
		// ==> Se manda encriptar automáticamente:
		userInstance.password = user.password;

		// Guardar en BD:
		await userInstance.save();

		// Devolvemos el usuario recien creado:
		return response.json(userInstance);
	}

	async profile({request, response, auth}){
		// - Si llego bien el token, se podra acceder a obtener el user identificado
		let user = await auth.getUser();

		// Es igual a usar: const { user } = request.all();
		// Como es un array, se accede => 
		const userInput = request.input('user');
		user.email = userInput['email'];
		user.username = userInput['username'];
		await user.save();

		// Debido a que se actualiza la info del User => Deja de ser valido el token
		// Se debe generar uno nuevo:
		const logged = await auth.generate(user, true);
		// Se devuelve nuevo Token
		return response.json(logged);
	}
}

module.exports = AuthController
