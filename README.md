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
