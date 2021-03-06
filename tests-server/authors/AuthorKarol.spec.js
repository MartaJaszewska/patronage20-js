const mockedEnv = require('mocked-env')
const app = require('../../src/app.js')
const authors = require('../../src/public/authors.json')

describe('/authors/5', function () {
  let instance
  let restore

  beforeEach(async () => {
    restore = mockedEnv({
      COOKIE_VALUE: '',
      COOKIE_NAME: ''
    })
    instance = await app({ port: 3000 }).ready()
  })

  afterEach(async () => {
    restore()
    await instance.close()
  })

  describe('GET author with id 5', () => {
    test('should return author 5 data and status code 200', async function () {
      const result = await instance.inject({
        method: 'GET',
        url: '/api/v1/authors/5'
      })
      expect(result.statusCode).toBe(200)
      expect(JSON.parse(result.payload)).toEqual(authors[4])
    })
  })
})
