'use strict';

const Boom = require('@hapi/boom');
const { Service } = require('@hapipal/schmervice');
const EncryptIut = require('tppackage');
const MailerHelper = require('../helpers/mailer');

require('dotenv').config();

module.exports = class UserService extends Service {
    /**
     * @type EncryptIut
     */
    #crypto;
    initialize() {

        const { User } = this.server.models();
        this.userManager = User;
        this.#crypto = new EncryptIut(process.env.ENCRYPT_KEY);
    }

    async create(user) {

        const [potentiallyUser] = await this.userManager.query().select().where('username', user.username).orWhere('mail', user.mail);

        if (potentiallyUser) {
            throw Boom.badRequest('This identifiant is already used');
        }

        user.password = this.#crypto.encrypt(user.password);
        const userCreated = await this.userManager.query().insertAndFetch(user);
        MailerHelper.instance.send(user.mail, 'Inscription réussi', `📺 Bienvenue cher cynophile ! \n Merci ${user.firstName} pour votre abonnement à notre platforme 📺`);
        return userCreated;
    }

    async select() {

        return await this.userManager.query().select();
    }

    async delete({ id }) {

        await this.userManager.query().deleteById(id);
        return '';
    }

    async patch(id, payload) {

        if (payload.password) {
            payload.password = this.#crypto.encrypt(payload.password);
        }

        return await this.userManager.query().findById(id).patch(payload || {});
    }

    async login({ identifiant, password }) {

        const [user] = await this.userManager.query().select().where('username', identifiant).orWhere('mail', identifiant);
        if (user && this.#crypto.equals(password, user.password)) {
            return user;
        }
    }

    async getFavorites(userId) {

        return await this.userManager.relatedQuery('movies').for(userId);
    }

    async addFavorite(userId, filmId) {

        const favorites = await this.getFavorites(userId);

        if (favorites.map((film) => film.id).includes(filmId)) {
            throw Boom.badRequest('The user already has the movie in his favorite list');
        }

        await this.userManager.relatedQuery('movies').for(userId).relate(filmId);
    }

    async rmFavorite(userId, filmId) {

        const favorites = await this.getFavorites(userId);

        if (!favorites.map((film) => film.id).includes(filmId)) {
            throw Boom.badRequest('Unknow this film in the favorite list of the user');
        }

        await this.userManager.relatedQuery('movies').for(userId).unrelate().where('movie_id', filmId);
    }
};

