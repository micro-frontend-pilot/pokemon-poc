// export const mfeState = {
//     name: 'mfe',
//     url: '/mfe',
//     loadChildren: () => import('./contacts/contacts.module').then(mod => mod.ContactsModule)
//   };
// angular.module("mfe", []);

// function mfeTest () {
//     return (
//         "hi there"
//     )
// }

// export default mfeTest;

const Mfe = {
    template:  `<div>Wow ~~!!!</div>`
}

export default angular.module('mfe', [])
    .component('sampleMfe', Mfe)
    .name;