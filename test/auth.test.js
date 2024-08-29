const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const User = require('../models/User');

chai.use(chaiHttp);
chai.should();

describe('User Authentication', () => {
    before(async () => {
        await User.deleteMany({});
    });

    describe('POST /api/user/register', () => {
        it('should register a user', (done) => {
            chai.request(app)
                .post('/api/user/register')
                .send({ email: 'test@example.com', password: 'password', role: 1 })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.have.property('msg').eql('User registered successfully');
                    done();
                });
        });
    });

    describe('POST /api/user/login', () => {
        it('should login a user', (done) => {
            chai.request(app)
                .post('/api/user/login')
                .send({ email: 'test@example.com', password: 'password' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('token');
                    done();
                });
        });
    });
});
