const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

//funções do controller: index, show, store, update, destroy


module.exports = {

    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        //console.log(request.body);
        const { github_username, techs, latitude, longitude } = request.body;
        
        let dev = await Dev.findOne({ github_username });
        //Se nao existe um dev cadastrado pelo username do github realiza o store
        if(!dev){
            //chamada na api do GitHub para obter dados do perfil do usuario
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
            const { name = login, avatar_url, bio } = apiResponse.data;
            //const techsArray = techs.split(',').map(tech => tech.trim());
            const techsArray = parseStringAsArray(techs);
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }
    
        return response.json(dev);
    },

    async update(request, response){
      
    },

    async destroy(request, response){
        
        const { github_username } = request.body;

        Dev.deleteOne({ github_username }, function(err) {
            if (!err) {
                response.send('Dev ' + github_username + ' deletado com sucesso!!!');;
            }
            else {
                console.log(err);
            }
        });        
    },
};