'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

//- Metodo RUN para cargar datos fake a la BD
class DatabaseSeeder {
  async run () {
  	const customersArray = await Factory
  		.model('App/Models/Customer')
  		.createMany(5);

  	const cinemasArray = await Factory
  		.model('App/Models/Cinema')
  		.createMany(10);

  	const genreAction = await Factory
  		.model('App/Models/Genre')
  		.create({genre_name: 'Accion'});
  	const genreComedy = await Factory
  		.model('App/Models/Genre')
  		.create({genre_name: 'Comedia'});

  	// Iterar para cada cine y poblarlo de informacion
  	cinemasArray.forEach(async (cinema) => {
  		for(let i=1; i<=5; i++){
  			
  			const room = await Factory
  				.model('App/Models/Room')
  				.create({cinema_id: cinema.id});

  			const movie = await Factory
  				.model('App/Models/Movie').create();

  			await movie.genres().attach([genreAction.id, genreComedy.id]);

  			const movie_showing = await Factory
  				.model('App/Models/MovieShowing').create({
  					cinema_id: cinema.id,
  					room_id: room.id,
  					movie_id: movie.id,
  				});

  			const movie_showing_time = await Factory
  				.model('App/Models/MovieShowingTime').create({
  					movie_showing_id: movie_showing.id,
  				});

  			// - Para cada Customer, se agregan reservas y asientos
  			customersArray.forEach(async (customer) => {
  				const booking = await Factory
  					.model('App/Models/Booking').create({
  						customer_id: customer.id,
  						movie_showing_time_id: movie_showing_time.id,
  					});
  				await Factory
  					.model('App/Models/Seat').create({
  						booking_id: booking.id,
  					});
  			});

  		}
  	})
  	
  	
  }
}

module.exports = DatabaseSeeder
