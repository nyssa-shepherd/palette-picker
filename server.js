const express = require('express'); //brings in express
const bodyParser = require('body-parser'); //parses the JSON string and URL data submitted in a HTTP POST request
const app = express(); //creates an instance of express

app.use(bodyParser.json()); //applies body parser to JSON objects
app.use(express.static('public')); //brings in the html page
app.set('port', process.env.PORT || 3000); //sets the environment variable of port to a server, sets default port to 3000

const environment = process.env.NODE_ENV || 'development'; //sets environment variable if one isn't specified, falls back to development
const configuration = require('./knexfile')[environment]; //sets configuration variable to .knexfile environment 
const database = require('knex')(configuration); //sets up database to use knex with a configuration variable

app.get('/api/v1/projects', (request, response) => { //calling get on endpoint of api/v1/projects
  database('projects').select() //gives access to projects table from the database
    .then((projects) => {
      response.status(200).json(projects); //returns status of 200 and calls json on the projects objects
    })
    .catch((error) => {
      response.status(500).json({ error }); //returns 500 internal server error and calls json on the error
    });
});

app.post('/api/v1/projects', (request, response) => { //calling post on endpoint of api/v1/projects
  const projects = request.body; //create varible from the request object

  for (let requiredParameter of ['name']) { //for loop to check for required parameters
    if (!projects[requiredParameter]) { // if the project does not contain the required parameter
      return response //return status 424 unprocessable entity and sends error
        .status(422)
        .send({ error: `Expected format: { name: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('projects').insert(projects, 'id') //gives access to the project table in the data base and inserts new project with id
    .then(projects => {
      response.status(201).json({ id: projects_id[0], name: projects.name }) //returns status 201 created and jsons the project id and name
    })
    .catch(error => {
      response.status(500).json({ error }); //returns error 500 internal server error and jsons the error
    });
});

app.get('/api/v1/palettes', (request, response) => { //calling get on endpoint of api/v1/palettes
  database('palettes').select() //gives access to the palettes table in the database
    .then((palettes) => {
      response.status(200).json(palettes); //returns status 200 OK and jsons the palettes objects
    })
    .catch((error) => {
      response.status(500).json({ error }); //returns error 500 internal server error
    });
});

app.get('/api/v1/projects/:id/palettes', (request, response) => { //calling get on endpoint of api/v1/projects/:id/palettes
  database('palettes').select() //gives access to the palettes table in the database
    .then((palettes) => {
      response.status(200).json(palettes); //returns status 200 OK and jsons the palettes objects
    })
    .catch((error) => {
      response.status(500).json({ error }); //returns error 500 internal server error
    });
});

app.post('/api/v1/projects/:id/palettes', (request, response) => { //calling post on endpoint of api/v1/projects/:id/palettes
  database('palettes').select() //gives access to the palettes table in the database
  const palettes = request.body; //create varible from the request object

  for (let requiredParameter of ['name', 'color0', 'color1', 'color2', 'color3', 'color4', 'projects_id']) { //for loop to check for required parameters
    if (!palettes[requiredParameter]) { // if the project does not contain the required parameter
      return response //return status 424 unprocessable entity and sends error
        .status(422)
        .send({ error: `Expected format: { 
          name: <String>, 
          color0: <String>, 
          color1: <String>, 
          color2: <String>, 
          color3: <String>, 
          color4: <String>,
          projects_id: <Number>}. You're missing a "${requiredParameter}" property.` 
        });
    }
  }

  database('palettes').insert(palettes, 'id') //gives access to the palettes table in the data base and inserts new project with id
    .then(palettes => {
      response.status(201).json({ //returns status 201 created and jsons the project id and name
        id: palettes_id[0], 
        name: palettes.name,
        color0: palettes.color0, 
        color1: palettes.color1, 
        color2: palettes.color2, 
        color3: palettes.color3, 
        color4: palettes.color4,
        projects_id: palettes.projMatch.id
       })
    })
    .catch(error => {
      response.status(500).json({ error }); //returns status 500 internal server error and jsons the error
    });
});

app.listen(app.get('port'), () => { //set up server on port
  console.log('Express intro running on localhost:3000');
});

module.exports = app;