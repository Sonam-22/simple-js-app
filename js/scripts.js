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
    // If filter term is empty then return the entire list
    if (!searchName) {
      return pokemonList;
    }
    // Return the  pokemons whose name contain the searc term.
    return pokemonList.filter(pokemon => pokemon.name.includes(searchName));
  }

  function loadFilteredPokemonList() {
    // At first diaplay the entire list
    pokemonList.forEach(addListItem);
    // Get reference of pokemon list.
    let pokemonListContainer = $('#pokemon-list');
    // Add event  listener to the search input so that on each letter typed, list gets filtered.
    let searchInput = $('#search-input')
      .on('input', event => {
        // Everytime the user types anything, we should first clear the  existing list.
        pokemonListContainer.empty();
        // The we should get the new list filtered by the input provided by user.
        let filteredList = filteredPokemon(event.target.value);
        // display each item of the fitered list.
        filteredList.forEach(addListItem);
      });

  }

  function getAll() {
    return pokemonList;
  }
  // created function to add, within the pokemon-list ul, list items with buttons holding a Pokemon's name as its inner text.
  function addListItem(pokemon) {

    let pokemonList = $('#pokemon-list');
    let pokemonListItembutton = $('<button></button>')
      .addClass('list-group-item  text-capitalize list-group-item-action text-center')
      .addClass('shadow p-3 mb-5  rounded pokemon-list-item')
      .attr("data-toggle", "modal")
      .attr("role", "listitem")
      .attr("type", "button")
      .attr("data-target", "#pokemonModal")
      .text(pokemon.name)
      .on({
        click: () => {
          showDetails(pokemon);
        }
      });
    pokemonList.append(pokemonListItembutton);
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

      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      item.weight = details.weight;
      item.abilities = details.abilities;
    }).catch(function(e) {

      console.error(e);
    });

  }
  // function to show details of the pokemon on the button 'click' event, called above within addListItem function
  function showDetails(item) {
    loadDetails(item).then(function() {
      // console.log(item);
      showModal(item);
    });
  }

  function showModal(pokemon) {
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');

    modalTitle.empty();
    modalBody.empty();
    let pokemonName = $('<h2>' + pokemon.name + '</h2>');

    let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height + '</p>');

    let pokemonTypes = $('<p>' + 'Types: ' + pokemon.types.map(item => item.type.name).join(", ") + '</p>');

    let pokemonWeight = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');

    let pokemonAbilities = $('<p>' + 'Abilities: ' + pokemon.abilities.map(item => item.ability.name).join(", ") + '</p>');

    let pokemonImage = $('<img class=\'pokemon-modal-image\'>');
    pokemonImage.attr('src', pokemon.imageUrl);


    modalTitle.append(pokemonName); // pokemonName is displayed as the title in the modal
    modalBody.append(pokemonImage); // pokemonImage is displayed in the body of the modal
    modalBody.append(pokemonHeight); // pokemonHeight is displayed in the body of the modal
    modalBody.append(pokemonWeight); // pokemonWeight is displayed in the body of the modal
    modalBody.append(pokemonAbilities); // pokemonDetails are displayed in the body of the modal
    modalBody.append(pokemonTypes);

  }

  return {
    add: add,
    getAll: getAll,
    filteredPokemon: filteredPokemon,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    loadFilteredPokemonList: loadFilteredPokemonList,
    showDetails: showDetails
  };
})();
console.log(pokemonRepository.getAll());

console.log(pokemonRepository.filteredPokemon('Squirtle'));

pokemonRepository.loadList().then(function() {
  pokemonRepository.loadFilteredPokemonList();
});
