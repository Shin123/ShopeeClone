import * as matchers from '@testing-library/jest-dom/matchers'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import App from './App'
import path from './constants/path'

expect.extend(matchers)

describe('App', () => {
  test('App render and change page', async () => {
    render(<App />, {
      wrapper: BrowserRouter
    })
    const user = userEvent.setup()
    /**
     * waitFor will run call back a few until end timeout
     * number of time depends on the timeout and interval
     * default: timeout = 1000ms and interval = 50ms
     */
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shoppe clone')
    })

    // verify change route
    user.click(screen.getByText(/Đăng nhập/))
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shoppe clone')
    })
    screen.debug(document.body.parentElement as HTMLElement, 999999999)
  })

  test('redirect 404 page', async () => {
    const badRoute = '/bad/route'
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(screen.getByText(/Page Not Found/i)).toBeTruthy()
    })
  })

  test('render register page', async () => {
    window.history.pushState({}, 'Test page', path.register)
    render(<App />, { wrapper: BrowserRouter })

    await waitFor(() => {
      expect(screen.getByText(/Bạn đã có tài khoản?/i)).toBeTruthy()
    })
  })
})
