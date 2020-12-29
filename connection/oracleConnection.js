const oracle = require('oracledb');

credentials = 
    {
      user          : "elianestrada",
      password      : "4856",
      connectString : "34.72.195.200/ORCL18"
    }

try {
    oracle.initOracleClient({configDir: '/opt/oracle/your_config_dir'})
} catch (err) {
    console.error("Don't connection of client");
}

async function Open(query, binds, autoCommit){
    let connection = await oracle.getConnection(credentials);
    let result = await connection.execute(query, binds, {autoCommit});
    connection.release();
    return result;
}

exports.Open = Open;