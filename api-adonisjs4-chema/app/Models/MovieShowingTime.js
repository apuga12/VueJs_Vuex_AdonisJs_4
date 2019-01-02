'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MovieShowingTime extends Model {

	//- Por default los Models utilizan timestamps, fecha creación y actualización
	//- por tanto, si no los utilizamos, debemos indicarlo:
	static get createdAtColumn(){
		return null;
	}

	static get updatedAtColumn(){
		return null;
	}

	movie_showing(){
		return this.belongsTo('App/Models/MovieShowing');
	}

	bookings (){
		return this.hasMany('App/Models/Booking');
	}
}

module.exports = MovieShowingTime
