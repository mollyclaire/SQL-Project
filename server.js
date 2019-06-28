require("dotenv").config();
var inquirer = require("inquirer");

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.db_password,
  database: "greatbay_DB"
});

// connect to the mysql server and sql database
// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("connected as id " + connection.threadId);
//   // run the start function after the connection is made to prompt the user
//   start();
// });
start();

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "postOrBid",
      type: "rawlist",
      message: "Would you like to [POST] an auction or [BID] on an auction?",
      choices: ["POST", "BID"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.postOrBid.toUpperCase() === "POST") {
        //CALL POST FUNCTION HERE
        console.log("test")
        inquirer.prompt([
            {
                type:"input",
                name: "newItem",
                message: "Which item would you like to add?"
            },
            {
                type:"input",
                name: "startingBid",
                message: "What's the starting bid"
            },
        ]).then(function(add){
            console.log("Item added")
            connection.connect(function(err) {
                if (err) throw err;
                console.log("connected as id " + connection.threadId + "\n");
                post();
              });
              function post() {
                var query = connection.query(
                  "INSERT INTO auctions SET ?",
                  {
                    item_name: add.newItem,
                    starting_bid: add.startingBid,
                  },
                  function(err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + " item inserted!\n");
                  }
                )
                console.log(query.sql);
                connection.end();
            };
        })
      }
      else {
       // CALL BID AUCTION HERE
      }
    });
}

