const express = require('express');
const handlebars = require('express-handlebars')
const app = express()

app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.set("views", "./views")

const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

const mysql = require('mysql')
const connection = mysql.createConnection(config)
var sql = `CREATE TABLE IF NOT EXISTS people (id int NOT NULL AUTO_INCREMENT,name varchar(255),PRIMARY KEY (id));`
connection.query(sql)
sql = 'INSERT INTO people(name) values ?'
const values = [
    ['Jefferson'],
    ['Luiz'],
    ['Wesley']
    ]
connection.query(sql, [values])

app.get('/', (req,res) => {
    sql = 'SELECT * FROM people'
    connection.query(sql, (error,results) => {
        if(error)
            res.send(error)
        else
            res.render('people',{people : results})
    })
})

app.listen(3000);