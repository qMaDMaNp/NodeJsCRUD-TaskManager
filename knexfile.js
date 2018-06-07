// Update with your config settings.

module.exports = {

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  development: {
    client: 'postgresql',
    connection: {
      database: 'my_life1',
      user:     'postgres',
      password: 'pavel228'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
      connection: {
        database: process.env.DATABASE_URL + '?ssl=true',
        user: 'postgres',
        password: 'pavel228'
      },
      pool: {
        min: 2,
        max: 10
       },
      migrations: {
        tableName: 'knex_migrations'
       }
    }

};
