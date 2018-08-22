const expect = require('expect')
const request = require('supertest')

const { User } = require('../models/user')

const { app } = require('../server')
const { currencies, users, populateCurrencies, populateUsers } = require('./fixtures')

beforeEach(populateUsers)
beforeEach(populateCurrencies)

describe('GET /currencies', () => {
  it('should get all currencies', done => {
    request(app)
      .get('/currencies')
      .expect(200)
      .expect(res => {
        expect(res.body.currencies.length).toBe(2)
        expect(res.body.currencies[0].source).toBe(currencies[0].source)
        expect(res.body.currencies[1].source).toBe(currencies[1].source)
      })
      .end(done)
  })
})

describe('GET /currencies/:source', () => {
  it('should return currency doc', done => {
    request(app)
      .get('/currencies/usd')
      .expect(200)
      .expect(res => {
        expect(res.body.currency.source).toBe('USD')
      })
      .end(done)
  })

  it('should return 404 if currency not found', done => {
    request(app)
      .get('/currencies/dkk')
      .expect(404)
      .end(done)
  })
})

describe('GET /users/me', () => {
  it('should return user if authenticated', done => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBe(users[0]._id.toHexString())
        expect(res.body.email).toBe(users[0].email)
      })
      .end(done)
  })

  it('should return a 401 if not authenticated', done => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect(res => {
        expect(res.body).toEqual({})
      })
      .end(done)
  })
})

describe('POST /users/signup', () => {
  it('should create a user', done => {
    const email = 'example@example.com'
    const password = 'Abc12345'

    request(app)
      .post('/users/signup')
      .send({ email, password })
      .expect(200)
      .expect(res => {
        expect(res.headers['x-auth']).toBeTruthy()
        expect(res.body._id).toBeTruthy()
        expect(res.body.email).toBe(email)
      })
      .end(err => {
        if(err) {
          return done(err)
        }
        User.findOne({ email }).then(user => {
          expect(user).toBeTruthy()
          expect(user.password).not.toBe(password)
          done()
        }).catch(e => done(e))
      })
  })

  it('should return validation errors if request invalid', done => {
    const email = 'snabelaetellerandet'
    const password = 'ab'

    request(app)
      .post('/users/signup')
      .send({ email, password })
      .expect(400)
      .end(done)
  })

  it('should not create user if email already in use', done => {
    const email = users[0].email
    const password = 'Abc12345'

    request(app)
      .post('/users/signup')
      .send({ email, password })
      .expect(400)
      .end(done)
  })
})

describe('POST /users/login', () => {
  it('should log in user and return token', done => {
    const { email, password } = users[1]

    request(app)
      .post('/users/login')
      .send({ email, password })
      .expect(200)
      .expect(res => {
        expect(res.headers['x-auth']).toBeTruthy()
      })
      .end((err, res) => {
        if(err) {
          return done(err)
        }
        
        User.findById(users[1]._id).then(user => {
          expect(user.toObject().tokens[0]).toMatchObject({
            access : 'auth',
            token : res.headers['x-auth']
          })
          done()
        }).catch(e => done(e))
      })
  })

  it('should reject invalid login', done => {
    const email = users[0].email
    const password = 'bababab'

    request(app)
      .post('/users/login')
      .send({ email, password })
      .expect(401)
      .expect(res => {
        expect(res.headers['x-auth']).toBeFalsy()
      })
      .end((err, res) => {
        if(err) {
          return done(err)
        }
        
        User.findById(users[1]._id).then(user => {
          expect(user.tokens.length).toBe(0)
          done()
        }).catch(e => done(e))
      })
    })
})

describe('DELETE /users/logout', () => {
  it('should remove auth token on logout', done => {
    request(app)
     .delete('/users/logout')
     .set('x-auth', users[0].tokens[0].token)
     .expect(200)
     .end((err, res) => {
       if(err) {
         return done(err)
       }

       User.findById(users[0]._id).then(user => {
         expect(user.tokens.length).toBe(0)
         done()
       }).catch(e => done(e))
     })
  })
})
