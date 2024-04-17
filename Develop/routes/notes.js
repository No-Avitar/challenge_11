const notes = require('express').Router();

const notesData = require('../db/db.json')

notes.get('/', (req, res) => {
    res.json(notesData)
})

notes.post('/', (req, res) => {
    console.info("request to save note")
    console.log(req.body)
    newNote = req.body
    newNote.id = Math.floor((1 + Math.random())*0x10000).toString(16).substring(1)
    console.log(newNote)
})

module.exports = notes;