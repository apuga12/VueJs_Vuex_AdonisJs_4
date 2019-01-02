'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

//- Todos los modelos extienden de Model: El ORM a utilizar por Adonis es Lucid.
class Booking extends Model {

	//- Por default los Models utilizan timestamps, fecha creación y actualización
	//- por tanto, si no los utilizamos, debemos indicarlo:
	static get createdAtColumn(){
		return null;
	}

	static get updatedAtColumn(){
		return null;
	}

	//- Aqui se definen las relaciones
	//- Cada reservación tiene asientos
	seats(){
		return this.hasMany('App/Models/Seat');
	}

	//- Cada reservación tiene un momento 
	//- (acceder a la película contra la que se ha hecho la reserva)
	movie_showing_time(){
		return this.belongsTo('App/Models/MovieShowingTime');
	}

}

module.exports = Booking
