const request = require('supertest');
const expect = require('chai').expect;
const knex = require('../db/knex');
const fixtures = require('./fixtures');

const app = require('../app');

describe('CRUD Stickers', () => {
    before((done) => {
        //run migrations
        knex.migrate
        .latest()
        .then(() => {
            //run seeds
            return knex.seed.run();
        })
        .then(() => done());        
    });

    after((done) => {
        //run migrations
        knex.destroy()
        .then(() => done());        
    });

    it('Lists All Records', (done) => {
        request(app)
        .get('/api/v1/stickers')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).to.be.an('array')
            expect(response.body).to.deep.equal(fixtures.stickers)
            done();
        });
    });

    it('Show Record by id', (done) => {
        request(app)
        .get('/api/v1/stickers/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).to.be.an('object');
            expect(response.body).to.deep.equal(fixtures.stickers[0]);
            done();
        });
    });

    it('Show Record by id', (done) => {
        request(app)
        .get('/api/v1/stickers/5')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).to.be.an('object');
            expect(response.body).to.deep.equal(fixtures.stickers[4]);
            done();
        });
    });

    it('Creates A Record', (done) => {
        request(app)
        .post('/api/v1/stickers')
        .send(fixtures.sticker)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            
            expect(response.body).to.be.an('object')
            fixtures.sticker.id = response.body.id;
            expect(response.body).to.deep.equal(fixtures.sticker)
            done();
        });
    });
    it('Update A Record', (done) => {
        fixtures.sticker.rating = 5;
        request(app)
        .put('/api/v1/stickers/10')
        .send(fixtures.sticker)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).to.be.an('object')
            expect(response.body).to.deep.equal(fixtures.sticker)
            done();
        });
    });

    it('Delete A Record', (done) => {
        request(app)
        .delete('/api/v1/stickers/10')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
            expect(response.body).to.be.an('object')
            expect(response.body).to.deep.equal({deleted: true})
            done();
        });
    });

    
});