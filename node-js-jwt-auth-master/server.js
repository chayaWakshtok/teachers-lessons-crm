const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const errorHandler = require('./app/middleware/error-handler');

const app = express();

var corsOptions = {
  origin: "http://localhost:4646"
};

app.use(cors(corsOptions));
//app.use(cors());

// parse requests of content-type - application/json
//app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
//app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();
//force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//  initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/teacher.routes')(app);
require('./app/routes/city.routes')(app);
require('./app/routes/lesson.routes')(app);
require('./app/routes/series.routes')(app);
require('./app/routes/subject.routes')(app);
require('./app/routes/holiday.routes')(app);
require('./app/routes/hour.routes')(app);

app.use(errorHandler);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "student"
  });
 
  Role.create({
    id: 2,
    name: "teacher"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });

  db.city.create({
    name:"Bnei Brak"
  })

  db.city.create({
    name:"Jerusalem"
  })

  db.city.create({
    name:"Tell Aviv"
  })
}