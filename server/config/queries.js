const environments = {

    user: {
        findAll: ``,

        findById: ``,

        findByEmail: `SELECT USER_EMAIL FROM USER_TB WHERE USER_EMAIL=?`,

        save: `INSERT INTO USER_TB(user_email, user_name, password, pw_salt) 
               VALUES (?, ?, ?, ?)`,

        update: ``
    },
    post: {
        a: ``,

    }
    
}

module.exports = environments
