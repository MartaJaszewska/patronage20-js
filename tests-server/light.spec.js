/* globals beforeEach, afterEach, describe, test, expect */
const mockedEnv = require('mocked-env')
const app = require('./../src/app.js')
const axios = require('axios')

jest.mock('axios')

// Start application before running the test case
describe('/api/v1/light', function () {
  let instance
  let restore

  beforeEach(async () => {
    restore = mockedEnv({
      COOKIE_VALUE: '',
      COOKIE_NAME: ''
    })
    instance = await app({ port: 3000 }).ready()
  })

  // Stop application after running the test case
  afterEach(async () => {
    restore()
    await instance.close()
  })

  describe('PUT method', () => {
    test('should return status code 200 if request body fits schema', async function () {
      const data = {
        id: 7,
        type: 'LED_CONTROLLER',
        hue: 100,
        saturation: 50,
        value: 50
      }

      axios.put.mockImplementation(() => Promise.resolve({ status: 200, data: {} }))

      const result = await instance.inject({
        method: 'put',
        url: 'api/v1/light',
        payload: data
      })

      expect(axios.put).toBeCalled()
      expect(result.statusCode).toBe(200)
    })

    test('should return status code 400 if request body doesn\'t fit schema', async function () {
      const data = {
        id: 'zzz',
        type: 'LED_CONTROLLER',
        hue: 106460,
        saturation: 56460,
        value: 73750
      }

      axios.put.mockImplementation(() => Promise.resolve({ status: 200, data: {} }))

      const result = await instance.inject({
        method: 'put',
        url: 'api/v1/light',
        payload: data
      })

      expect(axios.put).toBeCalled()
      expect(result.statusCode).toBe(400)
    })

    test('should return status code 500 if promise gets rejected', async function () {
      const data = {
        id: 5,
        type: 'LED_CONTROLLER',
        hue: 100,
        saturation: 50,
        value: 80
      }

      axios.put.mockImplementation(() => Promise.reject((new Error('err'))))

      const result = await instance.inject({
        method: 'put',
        url: 'api/v1/light',
        payload: data
      })

      expect(axios.put).toBeCalled()
      expect(result.statusCode).toBe(500)
    })
  })
})
