import { HttpStatusCode } from 'axios'
import { http } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll } from 'vitest'

const loginResponse = {
  message: 'Đăng nhập thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2FjMDQ1YjExNDAwODkzZGY3MTU2NSIsImVtYWlsIjoiZDk5OTlAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wNi0xM1QwNDowODo0MC41MzBaIiwiaWF0IjoxNzE4MjUxNzIwLCJleHAiOjE3MTgzMzgxMjB9.T66bCvjzXOYDUFAm2b_eAtm7bm6hctzf8SHXPF7xSgQ',
    expires: 86400,
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2FjMDQ1YjExNDAwODkzZGY3MTU2NSIsImVtYWlsIjoiZDk5OTlAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wNi0xM1QwNDowODo0MC41MzBaIiwiaWF0IjoxNzE4MjUxNzIwLCJleHAiOjE4MDQ2NTE3MjB9.0w1u93ou84eVL3s460jDLHgWOcEfRodcxUoI8dPWcWY',
    expires_refresh_token: 86400000,
    user: {
      _id: '657ac045b11400893df71565',
      roles: ['User'],
      email: 'd9999@gmail.com',
      createdAt: '2023-12-14T08:43:49.357Z',
      updatedAt: '2024-06-10T17:14:48.287Z',
      __v: 0,
      address: 'dia chifdfdfd',
      date_of_birth: '2005-12-09T17:00:00.000Z',
      name: 'test 11232323123123123',
      phone: '123123123123',
      avatar: '98fc4371-5446-412d-ab7b-05f0f9325e6f.png'
    }
  }
}

export const restHandlers = [
  http.post(`${import.meta.env.VITE_BASE_URL}login`, (req, res, ctx) => {
    return res(ctx.status(HttpStatusCode.Ok), ctx.json(loginResponse))
  })
]

const server = setupServer(...restHandlers)

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

//  Close server after all tests
afterAll(() => server.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
