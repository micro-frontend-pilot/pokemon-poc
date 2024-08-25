import angular from 'angular'
import uirouter from 'angular-ui-router'

import LazyLoader from './pokemons/LazyLoader.js';
import routes from './app.routes'
import pokemons from './pokemons'

angular
  .module('pokemonPoc', [uirouter, pokemons])
  .service('lazyLoader', LazyLoader)
  .config(routes)
