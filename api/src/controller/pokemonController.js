const axios = require('axios');
const { Pokemon, Type } = require("../db");
const { Op } = require("sequelize")

const getPokemons = async() => {

    const pokemonsDB = await Pokemon.findAll({
        attributes: ['id', 'name', 'image']
      });

    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')
    const resp = data.results

    const pokemonsApi = [];
    
    for (let i = 0; i < resp.length; i++) {
        const {data} = await axios.get(resp[i].url)
          
        pokemonsApi.push({
            "id": data.id,
            "name": data.name,
            "image": data.sprites.front_default
        })
    }
    


    return [...pokemonsDB, ...pokemonsApi];
     
};

const getTypes = async() => {
    const { data } = await axios.get('https://pokeapi.co/api/v2/type')
    const resp = data.results

    let typesFound = [];

    resp.forEach(type => {

        //creamos el array de objetos para hacer el bulk create
        typesFound.push({name: type.name})
    });

        //ejecutamos el bulk create
   Type.bulkCreate(typesFound)

    return typesFound;
};

const getByName = async(q) => {

   const pokemonsNameDB = await Pokemon.findAll({

        where: {
          name: {
            [Op.iLike]: `%${q}%`, // Busca coincidencias parciales en el nombre
          },
        },
        attributes: ['id', 'name', 'image']
    });
    
    let l;
    if (q) {
        l = q.toLowerCase();
    };

    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${l}`)
    //const resp = data.results

    const pokemonNameApi = [];
         
    pokemonNameApi.push({
        "id": data.id,
        "name": data.name,
        "image": data.sprites.front_default,
        "types": data.types[0].type.name
    });

    const allPokemons= [...pokemonsNameDB, ...pokemonNameApi]

    return allPokemons;
};

const createPokemon = async (name,image,life,stroke,defending,speed,height,weight,type) =>{

    const newPokemon = await Pokemon.Create({ 
        name,
        image,
        life,
        stroke,
        defending,
        speed,
        height,
        weight
    });



};

module.exports = {
    getPokemons,
    getTypes,
    getByName,
    createPokemon
};