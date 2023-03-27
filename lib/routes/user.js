'use strict';

const Joi = require('joi');

require('dotenv').config();

module.exports = [{
    method: 'post',
    path: '/user',
    options: {
        tags: ['api'],
        validate: {
            payload: Joi.object({
                firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                username: Joi.string().required().example('JhonDoe04').description('The user pseudo'),
                createdAt: Joi.date(),
                updatedAt: Joi.date(),
                password: Joi.string().min(8).required().description('User password'),
                mail: Joi.string().required().example('email@domain.fr').pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/).description('User email')
            })
        },
        auth: false
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        return await userService.create(request.payload);
    }
}];
