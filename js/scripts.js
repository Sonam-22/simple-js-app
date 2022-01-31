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
    let keys = Object.keys(pokemon);
    if (typeof pokemon === 'object' && !Array.isArray(pokemon)) {
      //validating Object.keys() to equal expected keys
      if (keys[0] === 'name' &&
        keys[1] === 'height' &&
        keys[2] === 'type') {
        pokemonList.push(pokemon);
      }
    }
  }
// function that allows to find specific Pokémon only by name
  function filteredPokemon(searchName) {
    return pokemonList.filter(pokemon => pokemon.name === searchName);

  }

  function getAll() {
    return pokemonList;
  }
  return {
    add: add,
    getAll: getAll,
    filteredPokemon: filteredPokemon
  };
})();
console.log(pokemonRepository.getAll());


pokemonRepository.add({
  // name: 'New Pokemon',
  // type: ['water']
  name: 'Squirtle',
  height: 0.5,
  type: ['water']

})

console.log(pokemonRepository.filteredPokemon('Squirtle'));

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
