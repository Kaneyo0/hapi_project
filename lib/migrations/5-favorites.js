'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('user_favorites', (table) => {

            table.integer('user_id').unsigned();

            table.foreign('user_id')
                .references('id')
                .inTable('user');

            table.integer('movie_id').unsigned();

            table.foreign('movie_id')
                .references('id')
                .inTable('film');

            table.primary(['user_id', 'movie_id']);
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('user_favorites');
    }
};
