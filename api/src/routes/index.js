const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routerPokemon = require('./routerPokemon')

const router = Router();

// Configurar los routers
router.use('/', routerPokemon);


module.exports = router;
