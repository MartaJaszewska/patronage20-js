import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import configureStore from 'redux-mock-store'
import i18n from '../../../i18n'
import Notifications from '../index'

const mockStore = configureStore([])

describe('<NotificationDrawer />', () => {
  let initialStore = {
    notification: {
      notifications: [{
        id: 7,
        timestamp: 1777777777,
        type: 'alert',
        sensorId: 6
      },
      {
        id: 6,
        timestamp: 1666666666,
        type: 'alert',
        sensorId: 6
      }],
      fetching: false,
      fetchError: false,
      updateError: false
    }
  }
  let store

  beforeEach(() => {
    store = mockStore(initialStore)
  })

  afterEach(() => {
    cleanup()
    initialStore = {
      notification: {
        notifications: [{
          id: 7,
          timestamp: 1777777777,
          type: 'alert',
          sensorId: 6
        },
        {
          id: 6,
          timestamp: 1666666666,
          type: 'alert',
          sensorId: 6
        }],
        fetching: false,
        updating: false,
        fetchError: false,
        updateError: false
      }
    }
  })

  test('should render <Notifications/>', () => {
    const { queryByTestId, queryAllByTestId } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Notifications />
        </I18nextProvider>
      </Provider>
    )

    expect(queryByTestId('notification-list')).toBeTruthy()
    expect(queryAllByTestId('drawer-item').length).toBe(2)
  })
  test('should render two lists', () => {
    initialStore.notification = {
      ...initialStore.notification,
      notifications: [{
        id: 7,
        timestamp: 1777777777,
        type: 'alert',
        sensorId: 6
      },
      {
        id: 6,
        timestamp: 1666666666,
        type: 'alert',
        sensorId: 6,
        isChecked: true
      }]
    }

    const { queryAllByTestId } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Notifications />
        </I18nextProvider>
      </Provider>
    )

    expect(queryAllByTestId('notification-list').length).toBe(2)
  })
  test('should render no-new-notifications', () => {
    initialStore.notification = {
      ...initialStore.notification,
      notifications: []
    }

    const { queryByTestId } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Notifications />
        </I18nextProvider>
      </Provider>
    )

    expect(queryByTestId('no-new-notifications')).toBeTruthy()
  })
  test('should render something-went-wrong', () => {
    initialStore.notification = {
      ...initialStore.notification,
      updateError: true
    }

    const { queryByTestId } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Notifications />
        </I18nextProvider>
      </Provider>
    )

    expect(queryByTestId('something-went-wrong')).toBeTruthy()
  })
  test('should render page404', () => {
    initialStore.notification = {
      ...initialStore.notification,
      fetchError: true
    }

    const { queryByTestId } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Notifications />
        </I18nextProvider>
      </Provider>
    )

    expect(queryByTestId('page-404')).toBeTruthy()
  })

  test('should remove one notification from list', () => {
    const { queryAllByRole } = render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Notifications />
        </I18nextProvider>
      </Provider>
    )
    const checkIcons = queryAllByRole('check-notification')
    const expectedAction = { type: 'NOTIFICATIONS_CHECK', id: 7 }
    fireEvent.click(checkIcons[0])
    const lastAction = store.getActions().length - 1

    expect(store.getActions()[lastAction]).toEqual(expectedAction)
  })
})
