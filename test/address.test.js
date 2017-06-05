const models = require('../models/index')
const Address = models.Address
const Person = models.Person

let chai = require('chai');
let server = require('../app');

chai.use(require('chai-http'))
chai.use(require('chai-as-promised'))
chai.should();

let addresses = []
let address = {}
let person = {}

describe('People', () => {
    beforeEach((done) => {
        Address.destroy({where: {}}, (err) => {
          done()
        }).then(() => {
          Person.create({name: 'teste'}).then(_person => {
            person = _person.dataValues
            Address.bulkCreate([
              { location: 'RS', personId: person.id },
              { location: 'SC', personId: person.id },
              { location: 'PR', personId: person.id }
            ]).then(() => {
              return Address.findAll();
            }).then(_addresses => {
              addresses = _addresses
              address = _addresses[0].dataValues
              done();
            })
          })
        });

    });
  describe('/GET addresses', () => {
      it('it should GET all the address', (done) => {
        console.log("************");
        console.log(person);
        console.log("************");
        chai.request(server)
            .get(`/people/${person.id}/addresses`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(3);
              done();
            });
      });
  });

  describe('/GET address', () => {
      it('it should GET specific address', (done) => {
        chai.request(server)
            .get(`/people/${person.id}/addresses/${address.id}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('id');
              res.body.should.have.property('location').eql(address.location);
              done();
            });
      });
  });
  /*
  * Test the /POST route
  */
  describe('/POST addresses', () => {
      it('it should create a addresses', (done) => {
        let address = {
            location: "Test"
        }
        chai.request(server)
            .post(`/people/${person.id}/addresses`)
            .send(address)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('location').eql('Test');
              done();
            });
      });
  });

  /*
  * Test the /PUT route
  */
  describe('/PUT address', () => {
    it('it should update a address location', (done) => {
      let _address = {
          location: "New Test"
      }
      chai.request(server)
          .put(`/people/${person.id}/addresses/${address.id}`)
          .send(_address)
          .end((err, res) => {
              res.should.have.status(200);
              Address.findById(address.id).then(address => {
                address.location.should.eql('New Test')
                done();
              })
          });
      });
    });

    /*
    * Test the /DELETE route
    */
    describe('/DELETE address', () => {
      it('it should remove one address from db', (done) => {
        chai.request(server)
            .delete(`/people/${person.id}/addresses/${address.id}`)
            .end((err, res) => {
                res.should.have.status(200);
                Address.count().then(count => {
                  count.should.be.equal(2)
                  done();
                })
            });
        });
    });
});
