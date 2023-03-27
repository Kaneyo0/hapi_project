'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class User extends Model {
    static get tableName() {

        return 'user';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            firstName: Joi.string().min(3).example('John').required().description('Firstname of the user'),
            lastName: Joi.string().min(3).example('Doe').required().description('Lastname of the user'),
            username: Joi.string().required().description('The user pseudo'),
            createdAt: Joi.date(),
            updatedAt: Joi.date(),
            password: Joi.string().min(8).required().description('User password'),
            mail: Joi.string().required().pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/).description('User email'),
            role: Joi.string().valid('user', 'admin')
        });
    }

    static get relationMappings() {

        const Film = require('./film');

        return {
            movies: {
                relation: Model.ManyToManyRelation,
                modelClass: Film,
                join: {
                    from: 'user.id',
                    through: {
                        from: 'user_favorites.user_id',
                        to: 'user_favorites.movie_id'
                    },
                    to: 'film.id'
                }
            }
        };
    }

    $beforeInsert(queryContext) {

        this.role = 'user';
        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }

};
