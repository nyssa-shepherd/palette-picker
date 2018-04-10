const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const requireHTTPS = (req, res, next) => {
  if(req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

if (process.env.NODE_ENV === 'production') { app.use(requireHTTPS); }

app.use(bodyParser.json());
app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then((projects) => {
      response.status(200).json(projects);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/projects', (request, response) => {
  const projects = request.body;

  for (let requiredParameter of ['name']) {
    if (!projects[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('projects').insert(projects, 'id')
    .then(projects => {
      response.status(201).json({ id: projects_id[0], name: projects.name })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/palettes', (request, response) => {
  database('palettes').select()
    .then((palettes) => {
      response.status(200).json(palettes);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/projects/:id/palettes', (request, response) => {
  database('palettes').select()
    .then((palettes) => {
      response.status(200).json(palettes);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/projects/:id/palettes', (request, response) => {
  const paletteInfo = request.body;

  for (let requiredParameter of ['name', 'color0', 'color1', 'color2', 'color3', 'color4', 'projects_id']) {
    if (!paletteInfo[requiredParameter]) {
      return response
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

  database('palettes').insert(paletteInfo, 'id')
    .then(palettes => {
      const { name, color0, color1, color2, color3, color4, projects_id } = paletteInfo;
      response.status(201).json({ id: palettes[0], name, color0, color1, color2, color3, color4, projects_id });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/palettes/:id', (request, response) => {
  const { id } = request.params;
  const item = database('palettes').where('id', id);
  
  item.delete()
    .then(data => {
      return response.status(204).json({ data });
    })
    .catch(error => {
      return response.status(404).json({ error });
    });
})

app.listen(app.get('port'), () => {
  console.log('Express intro running on localhost:3000');
});

module.exports = app;