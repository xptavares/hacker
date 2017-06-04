const models = require('../models/index')
const Person = models.Person

let chai = require('chai');
let server = require('../app');

chai.use(require('chai-http'))
chai.use(require('chai-as-promised'))
chai.should();

let person = []
let people = {}


describe('People', () => {
    beforeEach((done) => {
        Person.destroy({where: {}}, (err) => {
          done()
        }).then(() => {
          Person.bulkCreate([
            { name: 'barfooz' },
            { name: 'foo' },
            { name: 'bar' }
          ]).then(() => {
            return Person.findAll();
          }).then(_person => {
            person = _person
            people = _person[0]
            done();
          })
        });

    });
  describe('/GET person', () => {
      it('it should GET all the people', (done) => {
        chai.request(server)
            .get('/people')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(3);
              done();
            });
      });
  });

  describe('/GET people', () => {
      it('it should GET specific people', (done) => {
        chai.request(server)
            .get('/people/' + people.id)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('name').eql(people.name);
              done();
            });
      });
  });
  /*
  * Test the /POST route
  */
  describe('/POST person', () => {
      it('it should create a person', (done) => {
        let person = {
            name: "Test"
        }
        chai.request(server)
            .post('/people')
            .send(person)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('name').eql('Test');
              done();
            });
      });
  });

  /*
  * Test the /PUT route
  */
  describe('/PUT person', () => {
    it('it should update a person name', (done) => {
      let person = {
          name: "New Test"
      }
      chai.request(server)
          .put('/people/' + people.id)
          .send(person)
          .end((err, res) => {
              res.should.have.status(200);
              Person.findById(people.id).then(people => {
                people.name.should.eql('New Test')
                done();
              })
          });
      });
    });

    /*
    * Test the /DELETE route
    */
    describe('/DELETE person', () => {
      it('it should remove one people from db', (done) => {
        chai.request(server)
            .delete('/people/' + people.id)
            .end((err, res) => {
                res.should.have.status(200);
                Person.count().then(count => {
                  count.should.be.equal(2)
                  done();
                })
            });
        });
    });
});
