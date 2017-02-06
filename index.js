// подключаем основные модули
var express = require("express"),
    mysql = require("mysql"),
    app = express(),
    bodyParser = require("body-parser"),
    //connection = mysql.createConnection({
    //    host: 'localhost',
    //    database: 'myfinance',
    //    user: 'root',
    //    password: ''
    //}),
    connection = mysql.createConnection({
        host: 'sql11.freemysqlhosting.net',
        database: 'sql11155421',
        user: 'sql11155421',
        password: 'uKl6hmZy9q'
    }),
    date = new Date(),
    userData = {}, // в этой переменно будут храниться данные о пользователе, который вошел в систему
    year = date.getFullYear(),
    month = date.getMonth()+ 1,
    day = date.getDate(),
    currentDate = ""+year + "-"+ month + "-" + day;

// соединяемя с базой данный
connection.connect();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('app'));



// пример запроса !!!

//SELECT payment_history.PaymentValue, operations.Description , payment_history.PaymentDate, payment_history.Note, paymenttype.Name
//FROM payment_history
//JOIN balance  on payment_history.BalanceId=balance.Id
//JOIN users  on users.Id=balance.UserId
//JOIN operations  on payment_history.OperationsId=operations.Id
//JOIN paymenttype  on paymenttype.Id=operations.PaymentTypeId
//WHERE users.Id=1


// запрос на добавление нового юзера
app.post('/url', function(req, res){
    var data = req.body;

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
    console.log(userId);
    //connection.query("Select * From balance Where UserId='"+userData.Id+"'", function(err, rows){
    //    var data = rows[0];
    //    console.log(data);
    //    res.send([userData, data]);
    //});

    connection.query("SELECT payment_history.PaymentValue, operations.Description , payment_history.PaymentDate, payment_history.Note, paymenttype.Name "+
                    "FROM payment_history "+
                    "JOIN balance  on payment_history.BalanceId=balance.Id "+
                    "JOIN users  on users.Id=balance.UserId "+
                    "JOIN operations  on payment_history.OperationsId=operations.Id "+
                    "JOIN paymenttype  on paymenttype.Id=operations.PaymentTypeId "+
                    "WHERE users.Id="+userId+"",
        function(err, rows){
            res.send(rows);
    })

});

// запрос на operations
app.get('/getOperations', function(req, res){
   connection.query("Select * from operations", function(err, rows){
       res.send(rows);
   })
});
app.get('/getCurrency', function(req, res){
   connection.query("Select * from currency", function(err, rows){
       res.send(rows);
   })
});

// запрос на добавление новой операции в таблицу
app.post('/addOperation', function(req, res){
   var data = req.body,
       paymentTypeId,
       currencyId,
       paymentValue,
       operationId,
       paymentDate,
       balanceId = userData.Id,
       note;

    console.log(userData);

    data.name === 'Доход' ? paymentTypeId = 1 : paymentTypeId = 2;
    data.date === '' ? paymentDate = currentDate : paymentDate = data.date;
    data.descr === "" ? note = null :  note = data.descr;

    currencyId = data.currency.Id;
    paymentValue = parseInt(data.amount);

    if (data.category == ''){
        data.name === 'Доход' ? operationId = 3 : paymentTypeId = 4;
    } else {
        operationId = data.category.Id
    }

    connection.query("INSERT INTO `payment_history`(`OperationsId`, `PaymentValue`, `CurrencyId`, `BalanceId`, `PaymentDate`, `Note`) " +
                                            "VALUES ("+operationId+","+paymentValue+","+currencyId+","+balanceId+",'"+paymentDate+"',"+note+");",
        function(err, rows){
            console.log(rows);
    });
    console.log(data);

});


// запускаем сервер на 8000 порту
app.listen(8000, function(){
    console.log("listening port 8000");
});

//SELECT * FROM paymenttype
//SELECT * FROM operations WHERE NOT Id in (3,4)a

 //begin transaction
//
//IF @@TRANCOUNT > 0
//BEGIN
//BEGIN TRY
//MERGE Event_Type_Categories AS [Target]
//USING(
//    VALUES
//    ('Access Event'),
//    ('Application Event'),
//    ('Billing / Payment'),
//    ('Change Subscription'),
//    ('Complaint'),
//    ('Create New User'),
//    ('Credit Card Processing'),
//    ('Delivery Issue'),
//    ('Email Preference'),
//    ('Feedback'),
//    ('Login'),
//    ('Logoff'),
//    ('New Subscription'),
//    ('Registration'),
//    ('Service Success'),
//    ('Stop Subscription'),
//    ('Update Subscription Info'),
//    ('Update User Info'),
//    ('Vacation'),
//    ('Admin Emails'),
//    ('Reward / Contest')
//) AS [Source] ([Event_Type_CategoryName]) ON [Source].[Event_Type_CategoryName] = [Target].[Event_Type_CategoryName]
//WHEN NOT MATCHED BY TARGET THEN
//INSERT ([Event_Type_CategoryName])
//VALUES ([Source].[Event_Type_CategoryName])
//WHEN MATCHED THEN
//UPDATE SET
//    [Target].[Event_Type_CategoryName] = [Source].[Event_Type_CategoryName];
//END TRY
//BEGIN CATCH
//DECLARE @Error nvarchar(4000)
//SET @Error = ERROR_MESSAGE()
//RAISERROR(@Error, 11, 1)
//ROLLBACK TRANSACTION
//END CATCH
//END
//GO
//    [22:43:20] Alexey Gorbel: IF @@TRANCOUNT > 0
//BEGIN
//PRINT 'The database update succeeded.'
//COMMIT TRANSACTION
//END
//ELSE
//BEGIN
//RAISERROR('The database update failed.', 11, 1)
//END
//GO