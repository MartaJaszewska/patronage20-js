import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import HomeMap from './Map'

jest.mock('./helpers', () => {
  return {
    fromCoordinateToPercentMapper: () => 0,
    fromPercentToCoordinateMapper: () => 0,
    isFieldOccupied: () => false,
    validPointData: () => true
  }
})

const mockedSensorState = {
  sensors: [],
  loadingSensors: false,
  loadingError: null,
  sensorError: null
}

const mockedMapState = {
  listItemPressed: false,
  pressedItemId: undefined,
  waitingForSensorLocation: false,
  sensorColor: undefined,
  sensorData: undefined
}

describe('Map component tests', () => {
  const initialState = { sensor: mockedSensorState, mapListCommunication: mockedMapState }
  const mockStore = configureStore()
  const store = mockStore(initialState)

  describe('map render', () => {
    test('should render', () => {
      expect(render(<Provider store={store}><HomeMap /></Provider>)).not.toBeNull()
    })
  })
  describe('image tests', () => {
    test('image should appear in document', () => {
      expect(render(<Provider store={store}><HomeMap /></Provider>).getByTestId('image-id')).toBeInTheDocument()
    })
  })
  describe('map state tests', () => {
    test('should add sensor to state', () => {
      const { queryByTestId, queryAllByTestId } = render(<Provider store={store}><HomeMap /></Provider>)
      const sensorsAmount = queryAllByTestId('sensor-id').length

      fireEvent.click(queryByTestId('image-id'), {
        nativeEvent: {
          offsetX: 1000,
          offsetY: 1000
        }
      })

      expect(queryAllByTestId('sensor-id').length).toBe(sensorsAmount)
    })
  })
})
