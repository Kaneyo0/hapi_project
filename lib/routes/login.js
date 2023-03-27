'use strict';

const Joi = require('joi');
const Jwt = require('@hapi/jwt');

require('dotenv').config();

module.exports = [{
    method: 'POST',
    path: '/user/login',
    options: {
        tags: ['api'],
        validate: {
            payload: Joi.object({
                identifiant: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                password: Joi.string().required().description('User password')
            })
        },
        auth: false
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        const user = await userService.login(request.payload);
        if (!user) {
            return h.response('Invalid Credential').code(401);
        }


        return { login: Jwt.token.generate(
            {
                aud: 'urn:audience:iut',
                iss: 'urn:issuer:iut',
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.mail,
                id: user.id,
                scope: user.role
            },
            {
                key: process.env.JWT_KEY, // La clé qui est définit dans lib/auth/strategies/jwt.js
                algorithm: 'HS512'
            },
            {
                ttlSec: 14400 // 4 hours
            })
        };
    }
}];
