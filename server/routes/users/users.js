/**
 * @swagger
 * tags:
 *   name: User
 *   description: 사용자 정보 관리
 */


const express = require('express');
const os = require('os');
const path = require('path');
const dbInfo = require(path.join(__dirname, '../..', 'config/db_config'));
const userQuery = require(path.join(__dirname, '../..', 'config/queries'))['user'];
const crypto = require(path.join(__dirname, '../..', 'config/password_config'));

const router = express.Router();
//async 랩핑함수
const doAsync = fn => async (req, res, next) => await fn(req, res, next).catch(next);



/**
 * @swagger
 * /user/:
 *   get:
 *     summary: 사용자 정보 가져오기
 *     tags: [User]
 *     parameters:
 *       - in: path(sementic)
 *         name: email
 *         type: string
 *         enum: [test01@gmail.com, test02@naver.com, etc..]
 *         description: |
 *          get user: findByEmail
 *     responses:
 *       200:
 *         description: 성공
 *       403:
 *         $ref: '#/components/res/Forbidden'
 *       404:
 *         $ref: '#/components/res/NotFound'
 *       500:
 *         $ref: '#/components/res/BadRequest'
 */
router.get('/api/getUsername/:email', doAsync(async (req, res, next) => {
    try {
        const connection = await dbInfo.getConnection();
		try {
            let getEmail = req.params.email;
            let chkUser = (await connection.execute(userQuery['findByEmail'], [getEmail]))[0];

            // 중복 이메일
            if (chkUser.length > 0) {
                res.send({ result: true
                            , userEmail: chkUser[0].user_email
                            , userMame: chkUser[0].user_name
                });
            } else {
                res.send({ result: false });
            }
        } catch(err) {
            console.log('Query Error');
            res.send({ result: false });
		} finally {
            connection.release();
        }
	} catch(err) {
        console.log('DB Error');
        res.send({ result: false });
	} finally {
        return false;
    }
}));

module.exports = router; 