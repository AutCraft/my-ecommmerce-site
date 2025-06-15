const express = require('express');
const router = express.Router();
const path = require('path');

const sqlite3 = require("sqlite3").verbose();

const dbPath = path.join(__dirname, '..', 'data', 'contect.db');
const db = new sqlite3.Database(dbPath);

db.run(`CREATE TABLE IF NOT EXISTS contect(
        id INTEGER PRIMARY KEY,
        fname TEXT,
        lname TEXT,
        email TEXT,
        subject TEXT,
        message TEXT
    )`)

router.post('/', (req, res) => {
    const { fname, lname, email, subject, message } = req.body;
    var sql = `INSERT INTO contect (fname, lname, email, subject, message) VALUES ("${fname}","${lname}","${email}","${subject}","${message}")`;
    db.run('INSERT INTO contect (fname, lname, email, subject, message) VALUES (?,?,?,?,?)', [fname, lname, email, subject, message]);
    console.log('Contect form summited', { fname, lname, email, subject, message });
    res.status(200).json({ status: 'Contect saved in database!' });
});

router.get('/:action', (req, res) => {
    const { action } = req.params;

    switch (action) {
        case 'all':
            var sql = "SELECT * FROM contect ORDER BY id";
            db.all(sql, [], (err, rows) => {
                if (err) {
                    return res.status(500).json({ error: 'Fail to fetch contacts form DB!!' });
                }
                res.json(rows);
            });
            //return res.status(200).json({message: 'all'});
            break;
        case 'last':
            var sql = "SELECT * FROM contect WHERE id = (SELECT max(id) FROM contect)"
            db.all(sql, [], (err, rows) => {
                if (err) {
                    return res.status(500).json({ error: 'Fail to fetch contacts form DB!!' });
                }
                res.json(rows);
            });
            //return res.status(200).json({message: 'last'});
            break;
        default:
            if (!isNaN(action)) {
                var sql = "SELECT * FROM contect WHERE id = " + action;
                db.all(sql, [], (err, rows) => {
                    if (err) {
                        return res.status(500).json({ error: 'Fail to fetch contacts form DB!!' });
                    }
                    res.json(rows);
                });
            }else{
                return res.status(400).json({ error: 'Unknow action' });
            }
            break;
    }
});

module.exports = router;