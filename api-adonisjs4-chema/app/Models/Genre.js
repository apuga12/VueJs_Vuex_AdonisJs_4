'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Genre extends Model {

	//-*** Relacion muchos a muchos con Movie (definir lo mismo en ambas)

	//- Por default los Models utilizan timestamps, fecha creación y actualización
	//- por tanto, si no los utilizamos, debemos indicarlo:
	static get createdAtColumn(){
		return null;
	}

	static get updatedAtColumn(){
		return null;
	}

	//- Def. rel *.*
	// Debe haber una tabla intermedia (genre_movie)
	movies (){
		return this.belongsToMany('App/Models/Movie');
	}
}

module.exports = Genre
