'use strict';

const Joi = require('joi');

require('dotenv').config();

module.exports = [{
    method: 'post',
    path: '/user/addFavorite/{id}',
    options: {
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().required().example(1).description('id of the film')
            })
        },
        auth: {
            scope: ['user', 'admin']
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();
        await userService.addFavorite(request.auth.credentials.id, request.params.id);
        return '';
    }
}];
