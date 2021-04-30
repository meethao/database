var express = require('express');
var mysql = require('./dbcon.js');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));

const port = 2341;

app.use('/', express.static('public'));

app.get('/students/:id', function (req, res) {
  var sql = "SELECT * FROM Student WHERE ID = ?";
  var inserts = [req.params.id];
  mysql.pool.query(sql, inserts, function(error, results, fields){
    if(error){
      console.log("error");
    }
    if (results.length != 0){
      res.status(200).send("<!DOCTYPE html> \
      <html>        \
            <head>        \
                  <meta charset = 'utf-8'> \
                  <title>Students Information</title> \
                  <link rel = 'stylesheet' href = 'style.css'> \
            </head> \
      \
            <body>   \
                  <header > \
                        <div class = 'header-container'> \
                              <h1>Students Information</h1>  \
                        </div>  \
                  </header>    \
\
                  <p>Name: " + results[0].first_name + " " + results[0].last_name +  "</p> \
                  <p>ID: " + results[0].ID + "</p> \
                  <p>Major: " + results[0].major + "</p> \
            </body> \
      </html> "
                );
      // res.status(200).send(results[0]);
    }
    else {
      res.status(404).send("Not found.");
    }
  });
});

app.get('/instructors/:id', function (req, res) {
  var sql = "SELECT * FROM Instructor WHERE department = ?";
  var inserts = [req.params.id];
  mysql.pool.query(sql, inserts, function(error, results, fields){
    if(error){
      console.log("error");
    }
    if (results.length != 0){
      var instructors = "";
      var i;
      for (i = 0; i < results.length ; i++) {
        instructors += " \
        <p>Name: " + results[i].first_name + " " + results[i].last_name +  "</p> \
        <p>ID: " + results[i].ID + "</p> \
        <p>Department: " + results[i].department + "</p> \
        <br> \
        ";
      }
      res.status(200).send("<!DOCTYPE html> \
      <html>        \
            <head>        \
                  <meta charset = 'utf-8'> \
                  <title>Instructors Information</title> \
                  <link rel = 'stylesheet' href = 'style.css'> \
            </head> \
      \
            <body>   \
                  <header > \
                        <div class = 'header-container'> \
                              <h1>Instructors Information</h1>  \
                " + instructors + " \
                        </div>  \
                  </header>    \
            </body> \
      </html> "
                );
      // res.status(200).send(results[0]);
    }
    else {
      res.status(404).send("Not found.");
    }
  });
});

app.get('/courses/:id', function (req, res) {
  var sql = "SELECT * FROM Course WHERE name = ?";
  var inserts = [req.params.id];
  mysql.pool.query(sql, inserts, function(error, results, fields){
    if(error){
      console.log("error");
    }
    if (results.length != 0){
      var courses = "";
      var i;
      for (i = 0; i < results.length ; i++) {
        courses += " \
        <p>Name: " + results[i].name +  "</p> \
        <p>CRN: " + results[i].CRN + "</p> \
        <p>Credit: " + results[i].credit + "</p> \
        <br> \
        ";
      }
      res.status(200).send("<!DOCTYPE html> \
      <html>        \
            <head>        \
                  <meta charset = 'utf-8'> \
                  <title>Courses Information</title> \
                  <link rel = 'stylesheet' href = 'style.css'> \
            </head> \
      \
            <body>   \
                  <header > \
                        <div class = 'header-container'> \
                              <h1>Courses Information</h1>  \
                " + courses + " \
                        </div>  \
                  </header>    \
            </body> \
      </html> "
                );
      // res.status(200).send(results[0]);
    }
    else {
      res.status(404).send("Not found.");
    }
  });
});

app.get('/courses', function (req, res) {
  var sql = "SELECT * FROM Course";
  var inserts = [];
  mysql.pool.query(sql, inserts, function(error, results, fields){
    if(error){
      console.log("error");
    }
    if (results.length != 0){
      var courses = "";
      var i;
      for (i = 0; i < results.length ; i++) {
        courses += " \
        <p>Name: " + results[i].name +  "</p> \
        <p>CRN: " + results[i].CRN + "</p> \
        <p>Credit: " + results[i].credit + "</p> \
        <br> \
        ";
      }
      res.status(200).send("<!DOCTYPE html> \
      <html>        \
            <head>        \
                  <meta charset = 'utf-8'> \
                  <title>Courses Information</title> \
            </head> \
      \
            <body>   \
                  <header > \
                        <div class = 'header-container'> \
                              <h1>Courses Information</h1>  \
                " + courses + " \
                        </div>  \
                  </header>    \
            </body> \
      </html> "
                );
      // res.status(200).send(results[0]);
    }
    else {
      res.status(404).send("Not found.");
    }
  });
});

app.get('/registers/:id', function (req, res) {
  var sql = "SELECT * FROM Register WHERE student_id = ?";
  var inserts = [req.params.id];
  mysql.pool.query(sql, inserts, function(error, results, fields){
    if(error){
      console.log("error");
    }
    if (results.length != 0){
      var course = "";
      var i;
      for (i = 0; i < results.length; i++) {
        course += "<P> Course CRN: " + results[i].CRN + "</p> <br>"
      }
      res.status(200).send("<!DOCTYPE html> \
      <html>        \
            <head>        \
                  <meta charset = 'utf-8'> \
                  <title>Courses Information</title> \
                  <link rel = 'stylesheet' href = 'style.css'> \
            </head> \
      \
            <body>   \
                  <header > \
                        <div class = 'header-container'> \
                              <h1>Enrollment Information</h1>  \
                " + course + " \
                        </div>  \
                  </header>    \
            </body> \
      </html> "
                );
      // res.status(200).send(results[0]);
    }
    else {
      res.status(404).send("Not found.");
    }
  });
});


app.get('/students/delete/:id', function (req, res) {
  var sql = "DELETE FROM `Student` WHERE `ID` = ?";
  var inserts = [req.params.id];
  mysql.pool.query(sql, inserts, function(error, results, fields){
    if(error){
      console.log("error");
      res.status(404).send("Failed");
    }
    res.status(200).send("Success!");
  });
});

app.get('/instructors/delete/:id', function (req, res) {
  var sql = "DELETE FROM `Instructor` WHERE `ID` = ?";
  var inserts = [req.params.id];
  mysql.pool.query(sql, inserts, function(error, results, fields){
    if(error){
      console.log("error");
      res.status(404).send("Failed");
    }
    res.status(200).send("Success!");
  });
});

app.get('/courses/delete/:id', function (req, res) {
  var sql = "DELETE FROM `Course` WHERE `CRN` = ?";
  var inserts = [req.params.id];
  mysql.pool.query(sql, inserts, function(error, results, fields){
    if(error){
      console.log("error");
      res.status(404).send("Failed");
    }
    res.status(200).send("Success!");
  });
});

app.post('/students', function (req, res) {
  var sql = "INSERT INTO Student (first_name, last_name, ID, major) VALUES (?,?,?,?)";
  var inserts = [req.body.fname, req.body.lname, req.body.id, req.body.major];
  mysql.pool.query(sql,inserts,function(error, results, fields){
       if(error){
           res.send("FAILED.");
       }else{
           res.send("SUCCESSED.");
       }
   });
});

app.post('/instructors', function (req, res) {
  var sql = "INSERT INTO Instructor (first_name, last_name, ID, department) VALUES (?,?,?,?)";
  var inserts = [req.body.fname, req.body.lname, req.body.id, req.body.department];
  mysql.pool.query(sql,inserts,function(error, results, fields){
       if(error){
           res.send("FAILED.");
       }else{
           res.send("SUCCESSED.");
       }
   });
});

app.post('/courses', function (req, res) {
  var sql = "INSERT INTO Course (name, CRN, credit) VALUES (?,?,?)";
  var inserts = [req.body.name, req.body.crn, req.body.credit];
  mysql.pool.query(sql,inserts,function(error, results, fields){
       if(error){
           res.send("FAILED.");
       }else{
           res.send("SUCCESSED.");
       }
   });
});

app.post('/registers', function (req, res) {
  var sql = "SELECT * FROM Student WHERE ID = ?";
  var inserts = [req.body.id];
  mysql.pool.query(sql, inserts, function(error, results, fields){
    if(error){
      console.log("error");
      res.send("FAILED.");
    }
    else if(results.length == 0) {
        res.send("Student does not exist.");
    }
    else {
      var sql2 = "SELECT * FROM Course WHERE CRN = ?";
      var inserts2 = [req.body.crn];
      mysql.pool.query(sql2, inserts2, function(error, results, fields){
        if(error){
          console.log("error");
          res.send("FAILED.");
        }
        else if(results.length == 0) {
            res.send("Course does not exist.");
        }
        else {
          var sql3 = "INSERT INTO Register (student_id, CRN) VALUES (?,?)";
          var inserts3 = [req.body.id, req.body.crn];
          mysql.pool.query(sql3,inserts3,function(error, results, fields){
               if(error){
                   res.send("FAILED.");
               }else{
                   res.send("SUCCESSED.");
               }
           });
        }
      });
    }
  });


});


app.post('/students/update', function (req, res) {
  var sql = "UPDATE `Student` SET `first_name`= ?, `last_name`= ?, `major` = ? WHERE `ID` = ?";
  var inserts = [req.body.fname, req.body.lname, req.body.major, req.body.id];
  mysql.pool.query(sql,inserts,function(error, results, fields){
       if(error){
          console.log(error);
          res.send("FAILED.");
       }else{
          res.send("SUCCESSED.");
       }
   });
});

app.post('/instructors/update', function (req, res) {
  var sql = "UPDATE `Instructor` SET `first_name`= ?, `last_name`= ?, `department` = ? WHERE `ID` = ?";
  var inserts = [req.body.fname, req.body.lname, req.body.department, req.body.id];
  mysql.pool.query(sql,inserts,function(error, results, fields){
       if(error){
          console.log(error);
          res.send("FAILED.");
       }else{
          res.send("SUCCESSED.");
       }
   });
});

app.post('/courses/update', function (req, res) {
  var sql = "UPDATE `Course` SET `name`= ?, `credit`= ? WHERE `CRN` = ?";
  var inserts = [req.body.name, req.body.credit, req.body.crn];
  mysql.pool.query(sql,inserts,function(error, results, fields){
       if(error){
          console.log(error);
          res.send("FAILED.");
       }else{
          res.send("SUCCESSED.");
       }
   });
});

app.post('/registers/delete', function (req, res) {
  var sql = "DELETE FROM `Register` WHERE `student_id` = ? AND `CRN` = ?";
  var inserts = [req.body.id, req.body.crn];
  mysql.pool.query(sql,inserts,function(error, results, fields){
       if(error){
          console.log(error);
          res.send("FAILED.");
       }else{
          res.send("SUCCESSED.");
       }
   });
});

app.use(function(req,res){
  res.status(404).send("NOT FOUND");
});

app.listen(port, function(){
  console.log('Express started on http://localhost:' + port );
});
