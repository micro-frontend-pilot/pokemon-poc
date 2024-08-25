import angular from 'angular';
// require('./mfe/mfe.js../LazyLoader.js

routes.$inject = ['$stateProvider'];
export default function routes($stateProvider) {
  $stateProvider
  .state('pokemons', {
    url: '/',
    template: require('./pokemons.html'),
    resolve: {
      pokemons: ['PokemonsService', (PokemonsService) => {
        return PokemonsService.getPokemons()
      }]
    }
  })
  .state('mfe', {
    url: '/mfe',
    template: require('./mfe/mfe.html'),
    // component: 'SampleMfe',
    // lazyLoad: () => {
    //   // const mfe = import("./mfe/mfe.js");
    //   // mfe.then(fn=>{
    //   //   console.log(fn.default())
    //   //   const SampleMfe = {
    //   //     template: `<div>Wow!!!</div>`
    //   //   }
    //   //   angular.module("mfe").component("SampleMfe", SampleMfe);
    //   // });
    //   return {
    //     template: `<div>Wow~~~</div>`
    //   }
    // }
    // lazyLoad: ($transition$) => {
    //   return $transition$
    //       .injector()
    //       .get('lazyLoader').loadModules('../mfe/mfe.js');
    // }
    lazyLoad: ($transition$) => {
      return $transition$
          .injector()
          .get('lazyLoader').loadModules('./mfe/mfe.js');
    }
    // loadChildren: async () => await import('./mfe/mfe').then(mod => mod.default)
  });
}
