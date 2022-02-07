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
  // created function to add, within the pokemon-list ul, list items with buttons holding a Pokemon's name as its inner text.
  function addListItem(pokemon) {

    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    // added event listener to all pokemon buttons, to show pokemon details on 'click' event.
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }
  // function to show details of the pokemon on the button 'click' event, called above within addListItem function
  function showDetails(pokemon) {
    console.log(pokemon.name);
  }


  return {
    add: add,
    getAll: getAll,
    filteredPokemon: filteredPokemon,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();
console.log(pokemonRepository.getAll());


pokemonRepository.add({

  name: 'Squirtle',
  height: 0.5,
  type: ['water']

});

console.log(pokemonRepository.filteredPokemon('Squirtle'));


// forEach()
pokemonRepository.getAll().forEach(pokemonRepository.addListItem);
