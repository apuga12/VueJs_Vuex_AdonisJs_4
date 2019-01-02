'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Customer extends Model {

	//- Por default los Models utilizan timestamps, fecha creación y actualización
	//- por tanto, si no los utilizamos, debemos indicarlo:
	static get createdAtColumn(){
		return null;
	}

	static get updatedAtColumn(){
		return null;
	}

	bookings (){
		return this.hasMany('App/Models/Booking');
	}
}

module.exports = Customer
