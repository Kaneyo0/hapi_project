# iut-project

## Description du projet

--- 
Projet réalisé dans le cadre de ma Licence Professionnel. Ce dernier est une API réalisé avec le framework `HAPI`, vous permettant de vous connecter en tant qu'utilisateur avec différents rôles, à une collection de films. Chaque utilisateur peut réalisé les actions suivantes : 

- `Obtenir la liste de tous les films`
- `Ajouter un film à ses favoris`
- `Supprimer un film de sa liste de favoris`

Les utilisateurs avec des droits plus élévés peuvent : 

- `Ajouter des films`
- `Modifier des films`
- `Supprimer des films`

La création et la modification des films envois automatiquement un mail aux personnes concernées par ces actions.

## Lancer le projet

--- 

- `npm i` : Installation des packages
- `npm run start` : Lancement de l'application en production
- `npm run devstart` : Lancement de l'application en développement

### ⚠️ Les migrations ne sont pas lancées automatiquement au démarrage

Pour les lancer vous pouvez :

- Modifier le fichier `server>manifest.js`  
- Utiliser les [commande_knex](https://knexjs.org/guide/migrations.html)


## Variable d'environnement

Le fichier `.env` doit être situé dans le dossier `server`
---

- `DB_HOST` : Serveur de la base de données
- `DB_USER` :  Le nom d'utilisateur avec lequel vous vous connectez à la base
- `DB_PASSWORD` : Le mot de passe de l'utilisateur
- `DB_NAME` : Le nom de la base de données
- `DB_PORT` : Le port de connexion au serveur de base de données
- `ENCRYPT_KEY` : La clé de chiffrement des mots de passe
- `JWT_KEY` : Clé de chiffrement pour les tokens d'authentification
- `MAILER_HOST` : Serveur de mail pour vos envois
- `MAILER_PORT` : Port de connexion au serveur de mail
- `MAILER_AUTH_USER` : L'utilisateur qui effectuera les envois de mails (une adresse mail appartenant au serveur de mail)
- `MAILER_AUTH_PWD` : Le mot de passe de votre utilisateur pour les envois de mails

