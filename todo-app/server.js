let express = require("express");
// Running npm init -y will create a package.json file which will keep track of all imported files.
// When we installed express, it was added to package.json
let app = express();
let db

// Tell express to add all form elements to a body object
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  //When a user makes a get request to localhost:3000, the server will response with this HTML.
  //This is not a normal practice
  res.send(`
    <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Simple To-Do App</title>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
        </head>
        <body>
          <div class="container">
            <h1 class="display-4 text-center py-1">To-Do App</h1>
            
            <div class="jumbotron p-3 shadow-sm">
              <form action="/create-item" method="POST">
                <div class="d-flex align-items-center">
                  <input name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
                  <button class="btn btn-primary">Add New Item</button>
                </div>
              </form>
            </div>
            
            <ul class="list-group pb-5">
              <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                <span class="item-text">Fake example item #1</span>
                <div>
                  <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                  <button class="delete-me btn btn-danger btn-sm">Delete</button>
                </div>
              </li>
              <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                <span class="item-text">Fake example item #2</span>
                <div>
                  <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                  <button class="delete-me btn btn-danger btn-sm">Delete</button>
                </div>
              </li>
              <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                <span class="item-text">Fake example item #3</span>
                <div>
                  <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                  <button class="delete-me btn btn-danger btn-sm">Delete</button>
                </div>
              </li>
            </ul>
            
          </div>
          
        </body>
        </html>`);
});

app.post("/create-item", async function (req, res) {
  await db.collection('items').insertOne({text: req.body.item}) //Adding your form input into the Mongodb collections items
  //The response will not send until the create action above has finished
  res.send("Thanks for submitting the form!");
});

app.listen(3000);

/*
Productivity Tip - Continuity running of Node
Auto restart - npm install nodemon

How do we use nodemon?
Instead of 'npm server' we type 'nodemon server'
However, nodemon is installed locally and does not working globally.
To overcome that we can leverage our package.json file to create custom commands under scripts.
We will create a "watch" script which will run nodemon server continuously.
This means that even though nodemon is not available globally, it is smart enough to look to nodemon in the node_modules folder

Also, there will be 'async/await' syntax in this app, we will delve deeper into what it is and how it works in our complex app.
*/
