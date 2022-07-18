let foto = document.getElementById('foto')
let nombre = document.getElementById('nombre')
let estadisticas = document.getElementById('estadisticas')
let habilidades = document.getElementById('habilidades')
let movimientos = document.getElementById('movimientos')
let inputBusqueda = document.getElementById('inputBusqueda')
let botonBuscar = document.getElementById('buscar')
let p = document.querySelector('p')
let card = document.getElementById('card')
let card2 = document.getElementById('card2')
let cardNew = document.getElementById('cardNew')
let cardNew2 = document.getElementById('cardNew')
const body = document.body
card.remove()
card2.remove()

function fetchPokemons(name) {
  console.log(name)
  fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)

      nombre.innerText = data.name.toUpperCase()

      foto.setAttribute('src', `${data.sprites.front_default}`)
    })
}

function fetchPokemonsMoves(moves) {
  console.log(moves)
  fetch(`https://pokeapi.co/api/v2/pokemon/${moves.toLowerCase()}`)
    .then((res) => res.json())
    .then((data) => {
      //console.log( data.abilities)

      const cadenaMoves = data.moves.map((datos) => ' ' + datos.move.name)
      console.log(cadenaMoves)
      movimientos.innerText = cadenaMoves

      cadenaEstadisticas(data)
      for (let i = 0; i < data.abilities.length; i++) {
        console.log(data.abilities[i].ability.name)
        setAbilities(data.abilities[i].ability.name)
      }
    })
}

/* estadisticas.innerText = data.stats
habilidades.innerText = data.abilities
movimientos.innerText = data.moves.map()
foto.innerText = data.name */

//fetchPokemons('charmander')
const cadenaEstadisticas = function (stats) {
  for (let i = 0; i < stats.stats.length; i++) {
    console.log(stats.stats[i].stat.name + ' ' + stats.stats[i].base_stat)
    const li = document.createElement('ul')

    setEstadisticas(
      `${stats.stats[i].stat.name.toUpperCase()}  - ${
        stats.stats[i].base_stat
      }`,
    )
    estadisticas.append(li)
  }
}
function setEstadisticas(cadenaStats) {
  
  estadisticas.append(cadenaStats)
}

function setAbilities(cadenaAbilities) {
  
  habilidades.append(cadenaAbilities + ', ')
}

function buscar(nombre) {
  if (nombre) {
    
    fetchPokemons(nombre)
    fetchPokemonsMoves(nombre)
    cardNew.append(card)
    cardNew2.append(card2)
    
    borrarDatos()

  } 
  else {
    alert('Vacio')
  }
}

function borrarDatos(){
  habilidades.innerText = ''
  movimientos.innerText = ''
  estadisticas.innerText = ''
  inputBusqueda.value = ''
  inputBusqueda.focus()
}

inputBusqueda.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    console.log("buscando")
    buscar(inputBusqueda.value)
    
  }
});
