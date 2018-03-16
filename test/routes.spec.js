process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('Client Routes', () => {

});

describe('API Routes', () => {

  describe('GET /api/v1/projects', () => {

    it('should return all of the projects', () => {
      return chai.request(server)
      .get('/api/v1/projects')
      .then(response => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('Nyssa\'s Project');
      })
      .catch(err => {
        throw err;
      });
    });

  });

  // describe('POST /api/v1/projects', () => {

  //   it('should create a new project', () => {
  //     return chai.request(server)
  //     .post('/api/v1/projects') 
  //     .send({ name: 'My Rad Project' })
  //     .then(response => {
  //       response.should.have.status(201); 
  //       response.body.should.be.a('object');
  //       response.body.should.have.property('name');
  //       response.body.name.should.equal('My Rad Project');
  //     })
  //     .catch(err => {
  //       throw err;
  //     });
  //   });

  // });

  describe('GET /api/v1/palettes', () => {

    it('should return all of the palettes', () => {
      return chai.request(server)
      .get('/api/v1/palettes')
      .then(response => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('Bitchin Blue');
        response.body[0].should.have.property('color0');
        response.body[0].color0.should.equal('#3b73f2');
        response.body[0].should.have.property('color1');
        response.body[0].color1.should.equal('#08bbf3');
        response.body[0].should.have.property('color2');
        response.body[0].color2.should.equal('#4112e1');
        response.body[0].should.have.property('color3');
        response.body[0].color3.should.equal('#287b95');
        response.body[0].should.have.property('color4');
        response.body[0].color4.should.equal('#0a174c');
      })
      .catch(err => {
        throw err;
      });
    });

  });
});