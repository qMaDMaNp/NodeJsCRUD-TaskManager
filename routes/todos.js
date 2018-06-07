var express = require('express');
var router = express.Router();
const knex = require('../db/knex');

/* GET todos page. */
router.get('/', function(req, res, next) {
    knex('todo')
        .select()
        .then(todos => {
            res.render('allTodos', { todos: todos});
        });
});

module.exports = router;
