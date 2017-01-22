// подключаем основные модули
var express = require("express"),
    mysql = require("mysql"),
    app = express(),
    bodyParser = require("body-parser"),
    connection = mysql.createConnection({
        host: 'localhost',
        database: 'myfinance',
        user: 'root',
        password: ''
    }),
    date = new Date(),
    userData = {}; // в этой переменно будут храниться данные о пользователе, который вошел в систему

// соединяемя с базой данный
connection.connect();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('app'));



app.get('http://www.nbrb.by/API/ExRates/Currencies', function(req, res){
    console.log(res);
})
app.get('/getCurrency', function(req, res){
    console.log('hello')
});

// запрос на добавление нового юзера
app.post('/url', function(req, res){
    var data = req.body,
        year = date.getFullYear(),
        month = date.getMonth()+ 1,
        day = date.getDate(),
        currentDate = ""+year + "/"+ month + "/" + day;

    //добавляем данные в таблицу "users"
    connection.query("INSERT INTO `users`(`Login`,`UserName`, `Password`, `Email`, `RegistrationDate`) VALUES ('"+data.login+"','"+data.name+"','"+data.pass+"','"+data.email+"','"+currentDate+"');");

    res.send("ok");
});

// запрос на вход пользователя
app.post('/getUser', function(req, res){
    var data = req.body;

    connection.query("SELECT * FROM users WHERE Login='"+data.login+"' AND Password='"+data.pass+"'", function(err, rows){
        var data = rows;
        // записываем в глобальную переменную данные о пользователе, что бы потом передать их на главную стрпницу
        // криво, но что поделать :D
        userData = data[0];
        res.send(data);
    });


});

// запрос на основную стрпницу после входа пользователя
app.get('/getData', function(req, res){
    var userId = userData.Id;
    console.log(userData.Id);
    connection.query("Select * From balance Where UserId='"+userData.Id+"'", function(err, rows){
        var data = rows;
        console.log(data);
        res.send([userData, data]);
    });

});


// запускаем сервер на 8000 порту
app.listen(8000, function(){
    console.log("listening port 8000");
});