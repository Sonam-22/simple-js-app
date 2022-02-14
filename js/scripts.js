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
      // console.log(item);
      showModal(item);
    });
  }

  function showModal(pokemon) {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.innerHTML = ' ';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h3');
    titleElement.innerText = pokemon.name;

    let modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    let modalImage = document.createElement('div');
    modalImage.classList.add('modal-image');
    let image = document.createElement('img');
    image.src = pokemon.imageUrl;


    let contentElement = document.createElement('p');
    contentElement.innerText = `Height : ${pokemon.height}`;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modalImage.appendChild(image);
    modalContent.appendChild(modalImage);
    modalContent.appendChild(contentElement);
    modal.appendChild(modalContent);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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
