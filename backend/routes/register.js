const express = require('express');
const router = express.Router();

/*
1. read existing JSON file
2. parse it into array
3. add new data in arry
4. write array in file
*/

const fs = require('fs');
const path = require('path');

router.post('/', (req, res) => {
    const { fname, lname, email, password, occupationCat, occupation } = req.body;
    const user = {
        userAt: new Date(), fname, lname, email, password, occupationCat, occupation
    }

    const filePath = path.join(__dirname, "..", "data", "user.json");
    //step 1 - 2 : read the existing file an parse it into an arry
    let users = [];
    let emailDupli = false;

    if (fs.existsSync(filePath)) {
        let data = fs.readFileSync(filePath, "utf-8");
        users = JSON.parse(data);
        for (let i = 0; i <= users.length; i++) {
            if (users[i] && users[i].email === user.email) {
                emailDupli = true;
                break;
            }
        }
        if (emailDupli == false) {
            //step 3 : append new data
            users.push(user)
            //step 4 : write array back into file
            fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
            console.log('Register successfully', { email });
            res.status(200).json({ status: 'Register successfully', user })
        } else {
            console.log('This email has already been used', { email });
            res.status(200).json({ status: 'This email has already been used', user })
        }

    } else {
        users.push(user)
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
        console.log('Register successfully', { email });
        res.status(200).json({ status: 'Register successfully', user })
    }

    // console.log('Content form summited', {email});
    // res.status(200).json({message : 'Email Received'});
});

module.exports = router;