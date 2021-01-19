const express = require("express")
,     bodyParser = require("body-parser")
,     cors = require("cors")
,     app = express()
,     expressSwagger = require('express-swagger-generator')(app);

expressSwagger(require('./src/config/swagger.config'))

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./src/models");

// db.sequelize.sync();
// // drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

// Redirect to api docs
app.get("/", (req, res) => {
  res.redirect('/api-docs');
});

require("./src/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
