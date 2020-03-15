import * as actions from '../../actions/dashboard'
import { put, delay, all } from 'redux-saga/effects'
import axios from 'axios'

function * fetchSensorsSaga () {
  yield put(actions.fetchSensorsStart())
  try {
    yield delay(1000) // mock async, should be removed once real async requests are made
    // const response = yield axios.get('/api/v1/sensors') // exchange with real async
    const sensorsMock = [
      {
        id: 2,
        type: 'mocksens1',
        isOn: true
      },
      {
        id: 3,
        type: 'mocksens2',
        isOn: false
      }
    ]
    yield put(actions.fetchSensorsSuccess(sensorsMock))
  } catch (error) {
    yield put(actions.fetchSensorsFail(error))
  }
}

function * fetchMapSaga () {
  yield put(actions.fetchMapStart())
  try {
    yield delay(500) // mock async, should be removed once real async requests are made
    // const response = yield axios.get('/api/v1/map') // exchange with real async
    const mapMock = 'map'
    yield put(actions.fetchMapSuccess(mapMock))
  } catch (error) {
    yield put(actions.fetchMapFail(error))
  }
}

export function * loadDashboardSaga () {
  yield all([
    fetchSensorsSaga(),
    fetchMapSaga()
  ])
}

export function * changeSensorStatusSaga (action) {
  yield put(actions.changeSensorStatusStart())
  try {
    yield delay(500) // mock async, should be removed once real async requests are made
    console.log('mock response')
    // const response = yield axios.put('/on-off/endpoint/action.sensorId') // exchange with real async
    yield put(actions.changeSensorStatusSuccess())
  } catch (error) {
    yield put(actions.changeSensorStatusFail(error))
  }
}
