const notes = require('express').Router();

const { json } = require('express');
const {readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils')

notes.get('/', (req, res) => {

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

notes.post('/', (req, res) => {
    console.info("request to save note")
    console.log(req.body)
    newNote = req.body
    newNote.id = Math.floor((1 + Math.random())*0x10000).toString(16).substring(1)
    console.log(newNote)
    readAndAppend(newNote, "./db/db.json")

    const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);
})

notes.delete('/:id', (req, res) => {
    console.log(req.body)
    const noteId = req.params.id
    readFromFile('./db/db.json', 'utf8').then((data) => {
        const parseData = JSON.parse(data)
        const newData = parseData.filter((note) => note.id !== noteId)
        console.log(newData)
        return newData
    }).then((anything) => writeToFile('./db/db.json', anything)).then((anything) => {
        res.json(anything)
    })
})

module.exports = notes;