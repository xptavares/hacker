# Teste em Node

## Bootstrap project

`npm install`

`NODE_ENV='development' node_modules/.bin/sequelize db:migrate`
and
`NODE_ENV='test' node_modules/.bin/sequelize db:migrate`

if its dont work create two db in mysql:
`database_development and database_test`

next lets seed: `node_modules/.bin/sequelize db:seed:all`


now `npm test` all will be green :)
to start server `npm start`.

## routes avaliables

#### people

- /people/ - GET - get all persons
- /people/ - POST - create a people
- /people/:id - GET - get specific people
- /people/:id - PUT update people.
- /people/:id - DELETE delete people.

#### addresses

- /addresses/ - GET - get all addresses
- /addresses/ - POST - create a people
- /addresses/:id - GET - get specific people
- /addresses/:id - PUT update people.
- /addresses/:id - DELETE delete people.
