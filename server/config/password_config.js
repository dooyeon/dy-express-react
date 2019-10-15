var crypto = require('crypto');

module.exports = {

    getSaltCode: async function () {
        var salt = (await crypto.randomBytes(64)).toString('base64');
        return salt;
        /*crypto.randomBytes(64, (err, buf) => {
            if (err) throw err;
            return buf.toString('base64');
        });*/
    },

    getPassWord: async function (inputPass, salt) {
        var key = await crypto.pbkdf2Sync(inputPass, salt, 518, 64, 'sha512');
        return key.toString('hex');
        //crypto.pbkdf2Sync(inputPass, salt, 518, 64, 'sha512', function (err, key) {
        //    return key.toString('base64');
        //});
    }
}