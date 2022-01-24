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
]

document.write("<div class='pokemon-container'>");
for (let i = 0; i < pokemonList.length; i++) {
  console.log(pokemonList[i]);
  //This handles heights greater than or equal to 2
  if (pokemonList[i].height >= 2) {
    document.write(` ${pokemonList[i].name} (height: ${pokemonList[i].height}) - Wow, that’s big!<br> `);
  } else {
    document.write(` ${pokemonList[i].name} (height: ${pokemonList[i].height})<br>`);
  }
}
document.write("</div>");
