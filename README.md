# Backend - Koombea interview project

## Techs

- Nodejs: The backend is and api builded with nodejs;
- Express: as framework;
- Typeorm: as ORM;
- Postgres: as database;
- Tsyringe: as dependency injection;
- JWT: as authenticator

## Installation
```
"yarn" or "npm install" at root to install the dependencies.
```
It is necessary change the file "ormconfig.json" at root with the correct credentials to access the database.
```
"yarn typeorm migration:run" to create the database migrations (remember to check the ormconfig.json).
```
```
"yarn dev" and the server will be running.
```
Next step is to run the frontend react app.
