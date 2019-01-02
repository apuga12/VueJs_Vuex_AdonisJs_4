'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Route.on('/').render('welcome')

//- Definir un grupo de rutas bajo un prefijo api/v1
Route.group(() => {
	// Definición de una Petición HTTP Post:
	Route.post('login', 'AuthController.login');
	Route.post('register', 'AuthController.register');
	// Autenticación de la peticón mediante JWT (Valida contra el Auth del 
	// Header del request (token bearer: Payload del usr de BD))
	Route.put('profile', 'AuthController.profile').middleware('auth:jwt');

	Route.get('cinema/:id', 'CinemaController.findCinema');
	Route.get('cinemas', 'CinemaController.allCinemas');
	Route.get('genres', 'CinemaController.allGenres');

	//- Get todas las pelis de un Cinema
	Route.get('movies/:cinemaId/byCinema', 'MovieController.byCinema');
	Route.get('movies/:movieId/byMovie', 'MovieController.byMovie');

	Route.post('booking', 'BookingController.save').middleware('auth:jwt');
	Route.get('booking/last', 'BookingController.last').middleware('auth:jwt');
	Route.get('booking/all', 'BookingController.all').middleware('auth:jwt');
}).prefix('api/v1');
