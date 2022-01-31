// IIFE
let pokemonRepository = (function() {
  let pokemonList = [{
      name: 'Bulbasaur',
      height: 0.7,
      type: ['grass', 'poison']
    },
    {
      name: 'Ivysaur',
      height: 1,
      type: ['grass', 'poison']
    },
    {
      name: 'Venusaur',
      height: 2,
      type: ['grass', 'poison']
    },
    {
      name: 'Charmander ',
      height: 0.6,
      type: ['fire']
    },
    {
      name: 'Charmeleon',
      height: 1.1,
      type: ['fire']
    },
    {
      name: 'Charizard',
      height: 1.7,
      type: ['fire', 'flying']
    },
    {

      name: 'Squirtle',
      height: 0.5,
      type: ['water']
    }
  ];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }
  return {
    add: add,
    getAll: getAll
  };
})();
console.log(pokemonRepository.getAll());

document.write("<div class='pokemon-container'>");
// forEach()
pokemonRepository.getAll().forEach(function(pokemon) {
  //This handles heights greater than or equal to 2
  if (pokemon.height >= 2) {
    document.write(` ${pokemon.name} (height: ${pokemon.height}) - Wow, that’s big!<br> `);
  } else {
    document.write(` ${pokemon.name} (height: ${pokemon.height})<br>`);
  }
});
document.write("</div>");
