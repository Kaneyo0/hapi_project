'use strict';

module.exports = {
    async up(knex) {

        await knex.schema.alterTable('user', (table) => {

            table.string('role').defaultTo('user').alter();
        });
    },

    async down(knex) {

        await knex.schema.alterTable('user', (table) => {

            table.dropColumn('role');
        });
    }
};
