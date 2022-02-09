// IIFE
let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=50';


  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
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

  // function to load list of pokemon from apiUrl, stores name & detailsUrl in pokemonList via add()
  function loadList() {
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }
  // function to load further details about pokemon (items) in the pokemonList: image, height & types
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function(e) {
      console.error(e);
    });

  }
  // function to show details of the pokemon on the button 'click' event, called above within addListItem function
  function showDetails(item) {
    loadDetails(item).then(function() {
      console.log(item);
    });
  }


  return {
    add: add,
    getAll: getAll,
    filteredPokemon: filteredPokemon,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();
console.log(pokemonRepository.getAll());

console.log(pokemonRepository.filteredPokemon('Squirtle'));

pokemonRepository.loadList().then(function() {
  // forEach()
  pokemonRepository.getAll().forEach(pokemonRepository.addListItem);
});
