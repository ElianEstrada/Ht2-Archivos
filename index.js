const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./connection/oracleConnection')


const port = 3000
var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

getStudents = async (req, res) => {
    try{
        let query = "select * from student"; 
        let result = await db.Open(query, [], false);
        let students = []

        students = result.rows.map( user => {
            let studentSchema = {
                "name": user[0], 
                "email": user[1], 
                "password": user[2]
            }

            return studentSchema;
        })
        res.json(students)
    }
    catch(err) {
        console.log("Error => ", err);
        res.json({})
    }
}

registro = async (req, res) => {

    const body = req.body
    console.log(body.name);

    try{
        let query = `begin registry('${body.name}', '${body.email}', '${body.password}'); end;`;
        let result = await db.Open(query, [], false);
        res.send("Insert Successfully")
        console.log(result);
    }
    catch(err) {
        console.log("error", err);
        res.send("don't insert")
    }
}

login = async (req, res) => {
    const body = req.body
    try {
        let query = `select * from Student where email = '${body.email}' and password = '${body.password}'`
        let result = await db.Open(query, [], false);
        let user = result.rows
        console.log(user);

        if (user.length !== 0) {
            res.json({auth: true})
        }else{
            res.json({auth: false})
        }

        
    }
    catch(err) {
        console.log(err);
        res.send("Error to read data bases")
    }
}

app.listen(port, () => {
    console.log("The server listening on port 3000")
});

app.get('/', getStudents);

app.post('/login', login);

app.post('/registro', registro);

app.get('/getUsuarios', getStudents);
