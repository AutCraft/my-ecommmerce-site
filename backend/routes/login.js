const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');

router.post('/', (req, res) => {
    const { email, password } = req.body;
    const user = {
        userAt: new Date(), email, password
    }

    const filePath = path.join(__dirname, "..", "data", "user.json");
    //step 1 - 2 : read the existing file an parse it into an arry
    let users = [];
    let emailDupli = false;
    let passDupli = false;

    if (fs.existsSync(filePath)) {
        let data = fs.readFileSync(filePath, "utf-8");
        users = JSON.parse(data);
        for (let i = 0; i <= users.length; i++) {
            if (users[i] && users[i].email === user.email) {
                emailDupli = true;
                break;
            }
        }
        for (let i = 0; i <= users.length; i++) {
            if (users[i] && users[i].password === user.password) {
                passDupli = true;
                break;
            }
        }
        if (emailDupli == true) {
            if(passDupli == false){
                console.log('Incorrected Password', { email });
                res.status(200).json({ status: 'Incorrected Password', user })
            }else {
                console.log('Login successfully', { email });
                res.status(200).json({ status: 'Login successfully', user })
            }
        } else {
            console.log('Incorrected Username', { email });
            res.status(200).json({ status: 'Incorrected Username', user })
        }

    } else {
        console.log('Login error', { email });
        res.status(200).json({ status: 'Login fail', user })
    }

    // console.log('Content form summited', {email});
    // res.status(200).json({message : 'Email Received'});
});

module.exports = router;