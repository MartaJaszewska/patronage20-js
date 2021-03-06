import React from 'react'
import { create } from 'react-test-renderer'
import { render, screen } from '@testing-library/react'
import SensorsWarning from './index'
import { SnackbarProvider } from 'notistack'

import { Provider } from 'react-redux'

import configureStore from 'redux-mock-store'

import { I18nextProvider } from 'react-i18next'
import i18n from '../../../../i18n'

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack')
}))

describe('<SensorsWarning />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders SensorsWarning component', () => {
    const initialState = { sensor: { } }
    const mockStore = configureStore()
    const store = mockStore(initialState)

    const root = create(
      <Provider store={store}>
        <SnackbarProvider>
          <SensorsWarning />
        </SnackbarProvider>
      </Provider>
    )
    expect(root.toJSON()).toMatchSnapshot()
  })

  it('should show a snackbar if refreshError is not null', () => {
    const initialState = { sensor: { refreshError: 'error' } }
    const mockStore = configureStore()
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <SnackbarProvider>
          <I18nextProvider i18n={i18n}>
            <SensorsWarning />
          </I18nextProvider>
        </SnackbarProvider>
      </Provider>
    )

    expect(screen.getByText('Could not refresh sensors\' status.')).not.toEqual(null)
  })

  it('should close a snackbar if snackbar is open and refreshError is set to null, should not open a new one', () => {
    const notistack = require('notistack')

    const closeSnackbar = jest.fn()
    const enqueueSnackbar = jest.fn()
    jest.spyOn(notistack, 'useSnackbar').mockImplementation(() => { return { enqueueSnackbar, closeSnackbar } })

    const initialState = { sensor: { refreshError: null } }
    const mockStore = configureStore()
    const store = mockStore(initialState)

    render(
      <Provider store={store}>
        <SnackbarProvider>
          <SensorsWarning />
        </SnackbarProvider>
      </Provider>
    )

    expect(closeSnackbar).toHaveBeenCalledTimes(1)
    expect(enqueueSnackbar).not.toHaveBeenCalled()
  })
})
