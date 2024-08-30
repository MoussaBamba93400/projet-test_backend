const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const Timer = require('../models/Timer');
const User = require('../models/User');
const mongoose = require('mongoose');
require('dotenv').config();

chai.use(chaiHttp);
chai.should();

describe('Timer', () => {
    let token;
    let userId;

    before(async () => {

        

        const uri = process.env.MONGO_URI; 
        console.log("Connecting to MongoDB with URI:", uri);
      
        await mongoose.connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        

        await Timer.deleteMany({});
        await User.deleteMany({});

        const user = new User({ email: 'test2@example.com', password: 'password', role: 1 });
        await user.save();
        userId = user._id;

        const res = await chai.request(app).post('/api/user/login').send({ email: 'test2@example.com', password: 'password' });
        token = res.body.token;
    });

    describe('POST /api/timer/submit-reaction-time', () => {
        it('should submit a reaction time', (done) => {
            chai.request(app)
                .post('/api/timer/submit-reaction-time')
                .set('x-auth-token', token)
                .send({ time: 250 })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.have.property('msg').eql('Reaction time submitted');
                    done();
                });
        });
    });

    describe('GET /api/timer/get-reaction-times/:userId', () => {
        it('should get reaction times for a user', (done) => {
            chai.request(app)
                .get(`/api/timer/get-reaction-times/${userId}`)
                .set('x-auth-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
});
