# HAPI_PROJECT
---

## DESCRIPTION
Movie library made with hapi for the LP. You can create and manage movies. 

## SETUP
You must use `npm i` to install all the required packages.

Then configure a `.env` file by renaming `./server/.env-keep` and add it those parameters :
- `DB_HOST` : Database host
- `DB_USER` : Database user
- `DB_PASSWORD` : Databse password
- `DB_NAME` : Database name
- `DB_PORT` : Database port
- `ENCRYPT_KEY` : Password encryption key
- `JWT_KEY` : Token encryption key
- `MAILER_HOST` : Mailer host
- `MAILER_PORT` : Mailer port
- `MAILER_AUTH_USER` : Email of the user who will send the mails
- `MAILER_AUTH_PWD` : Password of the user who will send the mails

## RUN
- Type `npm run start` tu run the application.
- Go to `localhost:3000/documentation` to use all the routes.
