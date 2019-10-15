const mysql = require('mysql2/promise');
const config = require('./environments')['mysql'];

module.exports = {

    getConnection : async function () {
        /* Step 1, create DB Pool */
		const pool = mysql.createPool({
			host: config.host,
			user: config.user,
			password: config.password,
			database: config.database,
			connectionLimit:config.connectionLimit
		});
		// const connection = await pool.getConnection(async conn => conn);
		// return connection;
		return pool.getConnection();
    },

    getConnection_tmp : function (pool) {

       if (pool) return pool;

        //override close behavior to eliminate the pool
        // var close_conn = conn.close;
        // conn.close = function(){
        //     pool = null;
        //     close_conn.apply(conn, arguments);
        // }

        // return pool = conn.connect()
        //     .then(function(){ return conn; })
        //     .catch(function(err){
        //         pool = null;
        //         return Promise.reject(err);
        //     });
    }      
}