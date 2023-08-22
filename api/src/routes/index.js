const { Router } = require("express");
const axios = require("axios");
const { Pokemon, Type } = require("../db");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/pokemons", async (req, res) => {
  try {
    const pokemonFromDB = await Pokemon.findAll();
    console.log(pokemonFromDB);
    const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const response = [];
    for (const pokemon of pokemonFromDB) {
      response.push({
        uuid: pokemon.uuid,
        nombre: pokemon.nombre,
        imagen: pokemon.imagen,
        vida: pokemon.vida,
        ataque: pokemon.ataque,
        defensa: pokemon.defensa,
        velocidad: pokemon.velocidad,
        altura: pokemon.altura,
        peso: pokemon.peso,
        tipos: pokemon.tipos,
        source: "local",
      });
    }

    for (const pokemon of data.results) {
      response.push({
        uuid: null,
        id: pokemon.id,
        nombre: pokemon.nombre,
        imagen: pokemon.imagen, //front deffault, sprites.
        vida: pokemon.vida,
        ataque: pokemon.ataque,
        defensa: pokemon.defensa,
        velocidad: pokemon.velocidad,
        altura: pokemon.altura,
        peso: pokemon.peso,
        tipos: pokemon.tipos,
        source: "local",
      });
    }

    res.json({ externalAPI: data.results, localDataBase: pokemonFromDB });
  } catch (error) {
    res.status(500).json({
      error: "No se puede obtener la información de la API de los pokemons",
    });
  }
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
