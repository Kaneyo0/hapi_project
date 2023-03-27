'use strict';

require('dotenv').config();

module.exports = [{
    method: 'GET',
    path: '/users',
    options: {
        tags: ['api'],
        auth: {
            scope: ['admin', 'user']
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        return await userService.select(request.payload);
    }
}];
