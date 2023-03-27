'use strict';

const Joi = require('joi');
const User = require('../models/user');

require('dotenv').config();

module.exports = [{
    method: 'PATCH',
    path: '/user/{id}',
    options: {
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().required().example(1).description('id of the user')
            }),
            payload: Joi.object({
                firstName: User.field('firstName').tailor('patch'),
                lastName: User.field('lastName').tailor('patch'),
                username: User.field('username').tailor('patch'),
                password: User.field('password').tailor('patch'),
                mail: User.field('mail').tailor('patch'),
                role: User.field('role')
            })
        },
        auth: {
            scope: ['admin']
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();
        await userService.patch(request.params.id, request.payload);
        return '';
    }
}];
