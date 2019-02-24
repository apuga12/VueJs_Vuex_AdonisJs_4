<template>
  <div id="app">
    <navigation></navigation>
    <div v-if="processing">
      <BlockUI :message="$t('messages.processing')"></BlockUI>
    </div>
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
     <h2>
      {{ processing }}
     </h2>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
  // Imports
  import globalTypes from '@/types/global';
  // Sirve para mapear las variables del store con alias
  // Ejemplo:  this.$store.getters.processing ==> processing
  import {mapGetters} from 'vuex';
  import Navigation from '@/components/Navigation.vue';

  export default {
    components: {
      Navigation, 
    },
    name: 'app',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    computed: {
      // Definir los alias: 
      ...mapGetters({
        processing: globalTypes.getters.processing
      })
    }
  }
  </script>


<style>
  body {
    background-color: #36383A !important;
  }
  .well {
    background-color: #fff !important;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #2c3e50;
  }
  h1, h3, h4, p {
    color: #fff !important;
  }
  h2, a {
    color: #E33A2D !important;
  }
  th, td{
    color: #E33A2D !important;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }
  td {
    background-color: #fff;
  }
  hr {
    border: 1px solid #E33A2D !important;
    width: 100%;
  }
  .page-link.active  {
    background-color: #D24839 !important;
    color: #fff !important;
    border: 1px solid #fff !important;
  }
</style>