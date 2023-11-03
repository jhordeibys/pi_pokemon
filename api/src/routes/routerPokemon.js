const { Router } = require('express');

const {getPokemonsHandler, getTypesHandler, getByNameHandler, postHandler, getByIdHandler }= require ('../handler/pokemonHandler');

routerPokemon = Router();

routerPokemon.get("/pokemons", getPokemonsHandler);
routerPokemon.get("/types", getTypesHandler);
routerPokemon.get("/pokemons/name", getByNameHandler);
routerPokemon.post("/pokemons", postHandler);
routerPokemon.get("/pokemons/:id", getByIdHandler);




module.exports = routerPokemon
