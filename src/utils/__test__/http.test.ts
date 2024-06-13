import { describe, expect, it } from 'vitest'
import { Http } from '../http'
import { HttpStatusCode } from 'axios'
import { setAccessTokenToLS, setRefreshTokenToLS } from '../auth'
import { beforeEach } from 'node:test'

describe('http axios', () => {
  let http = new Http().instance
  beforeEach(() => {
    localStorage.clear()
    http = new Http().instance
  })
  const access_token_expired =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2FjMDQ1YjExNDAwODkzZGY3MTU2NSIsImVtYWlsIjoiZDk5OTlAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wNi0xMlQwOTowMDo0Ny4xMTBaIiwiaWF0IjoxNzE4MTgyODQ3LCJleHAiOjE3MTgxODI4NDh9.C8iq_QZByDT3CdmYJiQ8pe9Nd3o7_Hkg3pNkfaFhCYA'
  const refresh_token_100D =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1N2FjMDQ1YjExNDAwODkzZGY3MTU2NSIsImVtYWlsIjoiZDk5OTlAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNC0wNi0xMlQwOTowMjo1My45MzNaIiwiaWF0IjoxNzE4MTgyOTczLCJleHAiOjE4MDQ1ODI5NzN9.T4R4kqiAfXx59e6gf9jp_RrehNFOlJs55FQVnh5NNZo'

  it('Call API', async () => {
    const res = await http.get('products')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it('Auth Request', async () => {
    await http.post('login', {
      email: 'd999999@gmail.com',
      password: '123456'
    })
    const res = await http.get('me')
    // console.log('🚀 ~ it ~ res:', res)
    expect(res.status).toBe(HttpStatusCode.Ok)
  })

  it('Refresh Token', async () => {
    setAccessTokenToLS(access_token_expired)
    setRefreshTokenToLS(refresh_token_100D)
    const httpNew = new Http().instance
    const res = await httpNew.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
})
