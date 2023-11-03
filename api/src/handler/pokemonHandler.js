const {getPokemons, getTypes, getByName, createPokemon, getIdPokemon} = require("../controller/pokemonController");

const getPokemonsHandler = async (req, res) => {
    try {
        const response = await getPokemons();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const getTypesHandler = async (req, res) => {
    try {
        const response = await getTypes();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};


const getByNameHandler = async (req, res) => {
    try {
        const {q} = req.query;
        const response = await getByName(q);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const postHandler = async (req, res) => {
    try {
        const {name, image, life, attack, defense, speed, height, weight, type} = req.body;

        if(!name || !image || !life || !attack || !defense || !type)
        return res.status(401).send("imcomplete information");
        const response = await createPokemon(
            name,
            image,
            life,
            attack,
            defense,
            speed,
            height,
            weight,
            type
        );
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};


const getByIdHandler = async (req, res) => {
    try {
        const {id} = req.params;

        const response = await getIdPokemon(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};


module.exports = {
    getPokemonsHandler,
    getTypesHandler,
    getByNameHandler,
    postHandler,
    getByIdHandler
};