
<template>
	<nav class="navbar navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<button
					type="button" 
					class="navbar-toggle collapsed" 
					data-toggle="collapse" 
					data-target="#nav-collapse" 
					aria-expanded="false"
				>
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">Chema Vue.js 2 </a>
			</div>

			<div class="collapse navbar-collapse">
				<ul class="nav navbar-nav">
					<il>
						<router-link to="/"> {{ $t('navigation.cinema')}} </router-link>
					</il>
					<il>
						<router-link to="/profile" v-if="isLogged"> {{ $t('navigation.my_account')}} </router-link>
					</il>
					<il>
						<router-link to="/bookings" v-if="isLogged"> {{ $t('navigation.bookings')}} </router-link>
					</il>
				</ul>

				<ul class="nav navbar-nav navbar-right">
					<il>
						<router-link to="/login" v-if="!isLogged"> {{ $t('navigation.login')}} </router-link>
					</il>
					<il>
						<router-link to="/register" v-if="!isLogged"> {{ $t('navigation.register')}} </router-link>
					</il>
					<li>
						<a href="#" @click.prevent="logout()" v-if="isLogged"> {{ $t('navigation.logout') }} </a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>


<script>
	import {mapGetters, mapActions} from 'vuex';
	import authTypes from '@/types/auth';
	export default {
		// Navegacion de la App
		name: 'navigation',
		// Def metodos para uso exclusivo de este componente
		methods: {
			// Def de Alias para invocar metodos
			...mapActions({
				_logout: authTypes.actions.logout
			}),
			logout(){
				this._logout();
				// Def ruta a la cual redirigir
				this.$router.push({name: 'login'});
			}
		},

		// Acceder a propiedades => 
		computed: {
			...mapGetters({
				isLogged: authTypes.getters.logged
			})
		}
	}	
</script>

