'use strict';

const Joi = require('joi');
const Film = require('../models/film');

module.exports = [{
    method: 'GET',
    path: '/film',
    options: {
        tags: ['api'],
        auth: false
    },
    handler: async (request, h) => {

        const { filmService } = request.services();

        return await filmService.fetchAll(request.payload);
    }
}, {
    method: 'post',
    path: '/film',
    options: {
        tags: ['api'],
        validate: {
            payload: Joi.object({
                title: Film.field('title').tailor('full'),
                description: Film.field('description').tailor('full'),
                releaseDate: Film.field('releaseDate').tailor('full'),
                author: Film.field('author').tailor('full')
            })
        },
        auth: {
            scope: ['admin']
        }
    },
    handler: async (request, h) => {

        const { filmService } = request.services();

        return await filmService.create(request.payload);
    }
}, {
    method: 'PATCH',
    path: '/film/{id}',
    options: {
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().required().example(1).description('id of the film')
            }),
            payload: Joi.object({
                title: Film.field('title').tailor('patch'),
                description: Film.field('description').tailor('patch'),
                releaseDate: Film.field('releaseDate').tailor('patch'),
                author: Film.field('author').tailor('patch')
            })
        },
        auth: {
            scope: ['admin']
        }
    },
    handler: async (request, h) => {

        const { filmService } = request.services();
        await filmService.patch(request.params.id, request.payload);
        return '';
    }
}];
