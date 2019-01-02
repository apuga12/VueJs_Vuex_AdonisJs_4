'use strict'

// Acceder al modelo: User
const Cinema = use('App/Models/Cinema');
const Genre = use('App/Models/Genre');
const moment = require('moment');

class CinemaController {

	async allCinemas({response}){
		const cinemas = await Cinema.query().withCount('rooms as number_of_rooms').fetch();
		return response.json(cinemas);
	}

	async findCinema({response, params}){
		const cinema = await Cinema.find(params.id);  // ID pasado como param en routes.js => findCinema()
		// Acceder a un modelo que tiene varias relaciones anidadas:
		await cinema.loadMany({
			// Seleccionar si o si todos los IDs para relaciones foraneas
			movie_showings: (movie_showing) => {
				movie_showing
				.select('id', 'movie_id', 'room_id')
				// que solo arroje las movies para la fecha actual (moment)
				.where('movie_show_date', moment(new Date()).format("YYYY-MM-DD"))
				// Con metodo with(),
				// Pedir las relaciones anidades de moving_showing => movie_showing_times
				.with('movie_showing_times', (movie_showing_time) => {
					// Que arroje las movies superiores a la fecha actual
					movie_showing_time.where('hour_to_show', '>=', new Date().getHours())
					// movie_showing_times tambien tiene anidado => bookings, => para incluirlo:
					.with('bookings', (bookings) => {
						bookings.with('seats')
					})
				})
				.with('movie', (movie) => {
					movie.with('genres', (genres) => {
						genres.select('genre_name')
					})
				})
				.with('room')
			}
		});

		return response.json({data: cinema});
	} 

	  async allGenres ({response}) {
	    const genres = await Genre.all();
	    return response.json(genres);
	  }


}

module.exports = CinemaController
