const express = require('express');
const routes = express.Router();

//const subject_text = '{"contactSubject" : ["General Enquery", "Classes", "Schedules", "Instructer", "Prices", "Other", "test"]}';
const subject_file = require('../data/contact_subject.json');

routes.get('/', (req, res) => {
    //res.end(subject_text);
    res.json(subject_file);
});

module.exports = routes;