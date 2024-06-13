import * as matchers from '@testing-library/jest-dom/matchers'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from 'src/App'
import path from 'src/constants/path'
import { beforeAll, describe, expect, it } from 'vitest'
import { userEvent } from '@testing-library/user-event'

// import '@testing-library/jest-dom'

expect.extend(matchers)

describe('Login', () => {
  beforeAll(async () => {
    window.history.pushState({}, 'Test page', path.login)
    render(<App />, { wrapper: BrowserRouter })
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Email')).toBeTruthy()
    })
  })

  it('should display required error when value is invalid', async () => {
    const submitButton = document.querySelector('form button[type="submit"]') as Element
    fireEvent.submit(submitButton)

    await waitFor(() => {
      expect(screen.findByText('Email là bắt buộc')).toBeTruthy()
      expect(screen.findByText('Password là bắt buộc')).toBeTruthy()
    })
  })

  it('should display error when value is invalid', async () => {
    const emailInput = screen.queryByPlaceholderText('Email') as HTMLInputElement
    const passwordInput = screen.queryByPlaceholderText('Password') as HTMLInputElement
    const submitButton = screen.getByRole('button')

    fireEvent.input(emailInput, {
      target: {
        value: 'test@mail'
      }
    })
    userEvent.type(passwordInput, '8888s')
    fireEvent.submit(submitButton)
    await waitFor(() => {
      expect(screen.findByText('Email không đúng định dạng')).toBeTruthy()
      expect(screen.findByText('Độ dài tử 6 - 160 ký tự')).toBeTruthy()
    })
  })
})
