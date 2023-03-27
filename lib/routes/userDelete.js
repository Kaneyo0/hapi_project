'use strict';

const Joi = require('joi');

require('dotenv').config();

module.exports = [{
    method: 'DELETE',
    path: '/user/{id}',
    options: {
        tags: ['api'],
        validate: {
            payload: Joi.object({
                id: Joi.number().required().example(1).description('id of the user')
            })
        },
        auth: {
            scope: ['admin']
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();
        await userService.delete(request.payload);
        return '';
    }
}];
