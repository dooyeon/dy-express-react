const express = require('express');
const os = require('os');
const path = require('path');
const dbInfo = require(path.join(__dirname, '..', 'config/db_config'));
const userQuery = require(path.join(__dirname, '..', 'config/queries'))['user'];
const crypto = require(path.join(__dirname, '..', 'config/password_config'));

const router = express.Router();
//async 랩핑함수
const doAsync = fn => async (req, res, next) => await fn(req, res, next).catch(next);


/* GET home page. */
router.get('/api/getUsername', (req, res, next) => {
    res.send({ username: os.userInfo().username });
});


router.get('/api/saveUser', doAsync(async (req, res, next) => {
    try {
        const connection = await dbInfo.getConnection();
		try {
			/* Step 3. */
			var inputEmail = 'test01@gmail.com';
			var inputName = 'test01';
            var inputPW = '1234';
            var newSalt = await crypto.getSaltCode();
            let basePW = await crypto.getPassWord(inputPW, newSalt);

            let chkUser = (await connection.execute(userQuery['findByEmail'], [inputEmail]))[0];

            // 중복 이메일
            if (chkUser.length > 0) {
                res.send({ result: false });
                return false;
            }
            // await connection.beginTransaction();
            let result = await connection.execute(userQuery['save'], [inputEmail, inputName, basePW, newSalt]);
            // await connection.commit();
			connection.destroy();
            res.send({ result: true });
            
		} catch(err) {
            console.log('Query Error');
            await connection.rollback();
			connection.release();
            res.send({ result: false });
		}
	} catch(err) {
        console.log('DB Error');
        res.send({ result: false });
	}
    
}));

//aync ex1
router.get('/api/getUser', (req, res, next) => {
    
    (async () => {
        let pool = await dbInfo.getConnection();
        res.send({ username: os.userInfo().username });
    }) ();
});


module.exports = router; 