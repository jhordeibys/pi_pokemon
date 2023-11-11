const axios = require('axios');
const { Pokemon, Type } = require("../db");

const getPokemons = async() => {

    const pokemosDB = [];
    const getpokemonsDB = await Pokemon.findAll({
        attributes: ['id', 'name', 'image', 'attack'],
        include: {
            model: Type,
            through: {
                attributes:['typeId']
            }
        }
    });

      
      getpokemonsDB.map( p => 
        pokemosDB.push({ 
            "id": p.id,
            "name": p.name,
            "image": p.image,
            "type": p.types.map(t => t.name).join(' | '),
            "isApi": false,
            "attack": p.attack,
        }))


    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')
    const resp = data.results

    const pokemonsApi = [];
    
    for (let i = 0; i < resp.length; i++) {
        const {data} = await axios.get(resp[i].url)
          
        pokemonsApi.push({
            "id": data.id,
            "name": data.name,
            "image": data.sprites.front_default,
            "type": data.types.map(t => t.type.name).join(' | '),
            "isApi": true,
            "attack": data.stats[1].base_stat,
        })
    }
    


    return [...pokemosDB, ...pokemonsApi];
     
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
    typesFound.forEach( t => Type.findOrCreate({
        where: {
        name:  t.name
        },
        defaults:{
            name:t.name
        }
        })
    );

   const typeDB = await Type.findAll({
    attributes: ['id', 'name']
  });

    return typeDB;
};

const getByName = async(q) => {
    l = q.toLowerCase();
    
    let allPokemons = await Pokemon.findAll({
        where: {
            name: l
        },
        attributes: ['id', 'name', 'image']
    });

    if (allPokemons.length > 0) {
        return allPokemons
    }
    
    try {        
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${l}`);

        const found = {
            "id": data.id,
            "name": data.name,
            "image": data.sprites.front_default,
            "types": data.types.map(t => t.type.name).join(' | ')
        };
        allPokemons.push(found);

        return allPokemons
    } catch (error) {
        return "NOT FOUND";
    }
};

const createPokemon = async (name,image,life,attack,defense,speed,height,weight,type) =>{
    // crea el nuevo pokemon
    const newPokemon = await Pokemon.create({ 
        name,
        image,
        life,
        attack,
        defense,
        speed,
        height,
        weight
    });

    type.forEach( async (t) => {
        // busca los type en la bd 
        const typeDb = await Type.findAll({ where: { name: t } })
        // hace la relacion 
        if (typeDb) newPokemon.addType(typeDb)
    })
    return newPokemon;
}; 


const getIdPokemon = async (id) =>{
    
    let pokemonFoundId = null
    if (id.match("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$")) {

        const pokePk = await Pokemon.findByPk(id, {
            include:[{
                model:Type,
                through:{
                    attributes:['typeId']
                }
                
            }]
        });
        
        pokemonFoundId = {
            "id": pokePk.id, 
            "name": pokePk.name,
            "image":pokePk.image,
            "life":pokePk.life,
            "attack":pokePk.attack,
            "defense":pokePk.defense,
            "speed": pokePk.speed,
            "height": pokePk.height,
            "weight": pokePk.weight,
            "Type": pokePk.types.map(t => t.name).join(' | '),
            "isApi": false,
        }

       
    } else {
       const {data} = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

        pokemonFoundId = {
            "id": data.id, 
            "name": data.name,
            "image":data.sprites.front_default,
            "life":data.stats[0].base_stat,
            "attack":data.stats[1].base_stat,
            "defense":data.stats[2].base_stat,
            "speed": data.stats[5].base_stat,
            "height": data.height,
            "weight": data.weight,
            "Type": data.types.map(t => t.type.name).join(' | '),
            "isApi":true,
         };
    }

   return pokemonFoundId

}; 

module.exports = {
    getPokemons,
    getTypes,
    getByName,
    createPokemon,
    getIdPokemon
};