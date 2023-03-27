'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Film extends Model {
    static get tableName() {

        return 'film';
    }

    static get joiSchema() {

        return Joi.object({
            title: Joi.string().required().example('Titanic'),
            description: Joi.string().required().example('Un film fantastique'),
            releaseDate: Joi.date().required().example(new Date()),
            author: Joi.string().required()
        });
    }

    static get relationMappings() {

        const User = require('./user');

        return {
            users: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: 'film.id',
                    through: {
                        from: 'user_favorites.movie_id',
                        to: 'user_favorites.user_id'
                    },
                    to: 'user.id'
                }
            }
        };
    }



    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }
};
