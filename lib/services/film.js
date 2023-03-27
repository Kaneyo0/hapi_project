'use strict';

const { Service } = require('@hapipal/schmervice');
const MailerHelper = require('../helpers/mailer');
const Boom = require('@hapi/boom');

require('dotenv').config();

module.exports = class FilmService extends Service {
    initialize() {

        const { Film } = this.server.models();
        this.filmManager = Film;
    }

    async create(film) {

        await this.checkFilmExist(film.title);

        const userCreated = await this.filmManager.query().insertAndFetch(film);
        const { User } = this.server.models();
        const users = await User.query().select('mail');
        MailerHelper.instance.send(users.map((user) => user.mail), `Vite venez voir ! Le film ${ film.title } vient d'être ajouté`);
        return userCreated;
    }

    async fetchAll() {

        const films =  await this.filmManager.query().select('title', 'author', 'description', 'releaseDate');
        films.map((film) => {

            film.releaseDate = film.releaseDate.toLocaleDateString('fr');
            return film;
        });
        return films;
    }

    async delete({ id }) {

        await this.filmManager.query().deleteById(id);
        return '';
    }

    async patch(id, payload) {

        if (payload && payload.title) {
            await this.checkFilmExist(payload.title);
        }

        const film = await this.filmManager.query().findById(id);

        const users = await this.filmManager.relatedQuery('users').for(id);

        MailerHelper.instance.send(users.map((user) => user.mail), 'Mise à jour', `Votre film favoris "${film.title}" vient d'être mis à jour, venez décrouvir de quoi il s'agit`);

        return await this.filmManager.query().findById(id).patch(payload || {});
    }

    async checkFilmExist(title) {

        const [potentiallyFilm] = await this.filmManager.query().select().where('title', title);
        if (potentiallyFilm) {
            throw Boom.badRequest('This film already already create');
        }
    }
};

