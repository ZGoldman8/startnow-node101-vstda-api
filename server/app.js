const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

// add your code here
var array = [
    {
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false
    },
    {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    }
];

app.use(bodyParser.urlencoded(
    { extended: true }
));

app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.send(res.writeHead(200, { 'Content-Type': 'application/json' }));
});

//Why is it being posted as a string?
app.post("/api/TodoItems", function (req, res) {
    for (var i = 0; i < array.length; i++) {
        if (req.body.todoItemId == array[i].todoItemId) {
            array[i] = req.body;
            res.status(201).json(req.body);
        }
    }
    if (req.body.todoItemId == array.length) {
        array.push(req.body);
        console.log("Posted " + req.body);
        res.status(201).json(req.body);
    };
});


app.get("/api/TodoItems", function (req, res) {
    res.send(array);
});

app.get("/api/TodoItems/:todoItemId", function (req, res) {
    res.send(array[req.params.todoItemId]);
});

app.delete("/api/TodoItems/:todoItemId", function (req, res) {
    for (var i = 0; i < array.length; i++) {
        if (req.body.todoItemId == array[i].todoItemId) {
            var deletedArray = array.splice(i,1);
            console.log("Deleted " + JSON.stringify(deletedArray));
            res.status(200).json(deletedArray);
        }
    }
});

module.exports = app;
