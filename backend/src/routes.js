const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.delete('/devs', DevController.destroy);

routes.get('/search', SearchController.index);

module.exports = routes;

// Métodos HTTP: GET, POST, DELETE, PUT
// Tipos de parâmetros
// Query Params: request.query (Filtros, ordenação, paginação ...)
// Route Params: request.params (Identificar um recurso na alteração ou deleção)
// Body: request.body (dados para criação de um recurso)