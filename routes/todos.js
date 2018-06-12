const express = require('express');
const router = express.Router();
const knex = require('../db/knex');


/* GET todos page. */
router.get('/', (req, res) => {
    knex('todo')
        .select()
        .then(todos => {
            res.render('allTodos', { todos: todos});
        });
});

/* GET new todos page. */
router.get('/new', (req, res) => {
    res.render('newTodos');
});

/* GET id page. */
router.get('/:id', (req, res) => {
    const id = req.params.id;
    respondAndRenderTodo(id, res, 'todoNumber')
});

/* GET id edit page. */
router.get('/:id/edit', (req, res) => {
    const id = req.params.id;
    respondAndRenderTodo(id, res, 'editTodo');
});

/* POST todos form. */
router.post('/', (req, res) => {
    validateRedirection(req, res, (todo) => {
        todo.date = new Date;
        //insert in to a database
        knex('todo')
            .insert(todo, 'id')
            .then(ids => {
                const id = ids[0];
                res.redirect("/todos/" + id);
            });
    });
});

/* PUT edited todos.*/
router.put('/:id', (req, res) => {
    validateRedirection(req, res, (todo) => {
        todo.date = new Date;
        //insert in to a database
        knex('todo')
            .where('id', req.params.id)
            .update(todo, 'id')
            .then(() => {
                res.redirect("/todos/" + req.params.id);
            });
    });
});

/* DELETE a todos.*/
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if(typeof id != "undefined"){
        knex('todo')
            .where('id', id)
            .del()
            .then(() => {
                res.redirect('/todos');
            });
    } else {
        res.status(500);
        res.render('error', {
            message: 'Invalid id'
        });
    }
});

function validTodo(todo) {
    return typeof todo.title == 'string' &&
        todo.title.trim() != '' &&
        typeof todo.priority != 'undefined' && !isNaN(Number(todo.priority));
};

function respondAndRenderTodo(id, res, viewName) {
    if(typeof id != "undefined"){
        knex('todo')
            .select()
            .where('id', id)
            .first()
            .then(todo => {
                res.render(viewName, todo);
            });
    } else {
        res.status(500);
        res.render('error', {
            message: 'Invalid id'
        });
    }
};

function validateRedirection(req, res, callback) {
    if(validTodo(req.body)) {
        const todo = {
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority
        };
        callback(todo);
    } else {
        res.status(500);
        res.render('error', {
            message: 'Invalid todo'
        });
    }
};

module.exports = router;
