const buscar = async () => {
    try {
        const pokemonId = input.value;

        if(!pokemonId){
            throw new Error("Ingrese un ID válido")
        }

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        
        if(!response.ok){
            throw new Error("No se encontró el Pókemon")
        }

        const pokemon = await response.json();
        console.log(pokemon)
        contenedor.innerHTML = `
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.sprites.front_default}">
        <p>Tipos:</p>
        ${aplicarTipos(pokemon.types)}
        <p>Peso: ${pokemon.weight/10}kg</p>
        <p>Altura: ${pokemon.height/10}mts</p>
        `
    } catch (error) {
        console.log(error)
        contenedor.innerHTML = `
        <p>${error.message}</p>
        `
    }
}

const boton = document.getElementById("boton")
const input = document.getElementById("input")
const contenedor = document.getElementById("contenedor")
const aplicarTipos = tipos => {
    const parrafos = tipos.map(
        tipo => {
            return `<p>${tipo.type.name}</p>`
        }
    )
    return parrafos.join("\n")
}

boton.addEventListener("click", buscar);