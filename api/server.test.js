// Write your tests here
const request = require('supertest')
const server = require('./server')

test('sanity', () => {
  expect(true).toBe(true)
})

test('is the correct environment', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

describe('[POST] /register', () => {
  test('responds with error when no username', async () => {
    const res = await request(server).post('/api/auth/register').send({
      username: '',
      password: 'foobar'
    })
    expect(res.body).toMatchObject({message: 'username and password required'})
  })
  test('responds with error when no password', async () => {
    const res = await request(server).post('/api/auth/register').send({
      username: 'buzz',
      password: ''
    })
    expect(res.body).toMatchObject({message: 'username and password required'})
  })
})

describe('[POST] /login', () => {
  test('responds with error when no username', async () => {
    const res = await request(server).post('/login').send({
      username: '',
      password: 'foobar'
    })
    expect(res.status).toBe(404)
  })
  test('responds with error when no password', async () => {
    const res = await request(server).post('/api/auth/login').send({
      username: 'buzz',
      password: '',
    })
    expect(res.body).toMatchObject({message: 'username and password required'})
  })
})